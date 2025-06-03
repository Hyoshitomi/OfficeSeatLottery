import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { LoginForm } from '@/components/login/login-form'

// モックの設定
jest.mock('next-auth/react')
jest.mock('sonner')

const mockSignIn = signIn
const mockToast = toast

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('レンダリングテスト', () => {
    test('必要な要素が表示される', () => {
      render(<LoginForm />)
      
      expect(screen.getByText('Welcome back')).toBeInTheDocument()
      expect(screen.getByText('Login with your account')).toBeInTheDocument()
      expect(screen.getByLabelText('社員番号')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
      expect(screen.getByText('管理者に連絡してパスワードをリセット')).toBeInTheDocument()
    })

    test('初期状態でパスワードが非表示になっている', () => {
      render(<LoginForm />)
      
      const passwordInput = screen.getByLabelText('Password')
      expect(passwordInput.type).toBe('password')
    })
  })

  describe('ユーザーインタラクションテスト', () => {
    test('入力フィールドに値を入力できる', () => {
      render(<LoginForm />)
      
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      
      fireEvent.change(employeeInput, { target: { value: 'YY0001' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      expect(employeeInput.value).toBe('YY0001')
      expect(passwordInput.value).toBe('password123')
    })

    test('パスワード表示/非表示の切り替えができる', () => {
      render(<LoginForm />)
      
      const passwordInput = screen.getByLabelText('Password')
      const toggleButtons = screen.getAllByRole('button')
      const toggleButton = toggleButtons.find(button => 
        button.querySelector('svg') && button.type === 'button'
      )
      
      expect(passwordInput.type).toBe('password')
      
      fireEvent.click(toggleButton)
      expect(passwordInput.type).toBe('text')
      
      fireEvent.click(toggleButton)
      expect(passwordInput.type).toBe('password')
    })
  })

  describe('バリデーションテスト', () => {
    test('無効な社員番号でエラーメッセージが表示される', async () => {
      render(<LoginForm />)
      
      const form = screen.getByRole('button', { name: 'Login' }).closest('form')
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      
      fireEvent.change(employeeInput, { target: { value: '社員@123' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      // フォーム送信イベントを直接発火
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('社員番号は半角英数字のみ入力可能です')
      }, { timeout: 3000 })
    }, 10000) // 10秒のタイムアウト
  
    test('無効なパスワードでエラーメッセージが表示される', async () => {
      render(<LoginForm />)
      
      const form = screen.getByRole('button', { name: 'Login' }).closest('form')
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      
      fireEvent.change(employeeInput, { target: { value: 'YY0001' } })
      fireEvent.change(passwordInput, { target: { value: 'password@' } })
      
      // フォーム送信イベントを直接発火
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('使用可能な文字: 半角英数字と!?_$#')
      }, { timeout: 3000 })
    }, 10000) // 10秒のタイムアウト
  })
  
  describe('認証処理テスト', () => {
    test('ログイン成功時の処理', async () => {
      mockSignIn.mockResolvedValue({ ok: true, url: '/' })
      
      render(<LoginForm />)
      
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Login' })
      
      fireEvent.change(employeeInput, { target: { value: 'YY0001' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          redirect: false,
          employeeNumber: 'YY0001',
          password: 'password123',
          callbackUrl: undefined,
        })
      })
    })

    test('ログイン失敗時のエラー処理', async () => {
      mockSignIn.mockResolvedValue({ error: 'Invalid credentials' })
      
      render(<LoginForm />)
      
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Login' })
      
      fireEvent.change(employeeInput, { target: { value: 'YY0001' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('社員番号またはパスワードが正しくありません')
      })
    })
  })

  describe('ローディング状態テスト', () => {
    test('送信中はボタンが無効化され、テキストが変わる', async () => {
      mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100)))
      
      render(<LoginForm />)
      
      const employeeInput = screen.getByLabelText('社員番号')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Login' })
      
      fireEvent.change(employeeInput, { target: { value: 'YY0001' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
      
      expect(screen.getByText('認証中...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })
  })
})
