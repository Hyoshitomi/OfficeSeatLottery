import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PasswordMatchIndicator } from '@/components/account/password-match-indicator'

describe('PasswordMatchIndicator', () => {
  it('confirmPasswordが空の場合、何も表示されない', () => {
    const { container } = render(
      <PasswordMatchIndicator match={true} confirmPassword="" />
    )

    expect(container.firstChild).toBeNull()
  })

  it('パスワードが一致する場合、成功アイコンとメッセージが表示される', () => {
    render(
      <PasswordMatchIndicator match={true} confirmPassword="password123" />
    )

    expect(screen.getByText('パスワードが一致しています')).toBeInTheDocument()
    // Checkアイコンの存在確認（SVGの場合はroleやdata-testidで確認）
    const checkIcon = document.querySelector('svg')
    expect(checkIcon).toBeInTheDocument()
  })

  it('パスワードが一致しない場合、エラーアイコンとメッセージが表示される', () => {
    render(
      <PasswordMatchIndicator match={false} confirmPassword="password123" />
    )

    expect(screen.getByText('パスワードが一致しません')).toBeInTheDocument()
    // Xアイコンの存在確認
    const xIcon = document.querySelector('svg')
    expect(xIcon).toBeInTheDocument()
  })

  it('confirmPasswordがあるがmatchがfalseの場合、適切なスタイルが適用される', () => {
    render(
      <PasswordMatchIndicator match={false} confirmPassword="password123" />
    )

    const container = screen.getByText('パスワードが一致しません').closest('div')
    expect(container).toHaveClass('text-red-500')
  })

  it('confirmPasswordがあるがmatchがtrueの場合、適切なスタイルが適用される', () => {
    render(
      <PasswordMatchIndicator match={true} confirmPassword="password123" />
    )

    const container = screen.getByText('パスワードが一致しています').closest('div')
    expect(container).toHaveClass('text-green-500')
  })
})
