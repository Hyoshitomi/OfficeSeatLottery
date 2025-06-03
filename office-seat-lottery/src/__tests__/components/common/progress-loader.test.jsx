import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProgressLoader } from '@/components/common/progress-loader'

// Progressコンポーネントのモック
jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }) => (
    <div
      data-testid="progress"
      data-value={value}
      className={className}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      Progress: {value}%
    </div>
  )
}))

describe('ProgressLoader', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ProgressLoader progress={50} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toBeInTheDocument()
  })

  it('プログレス値が正しく渡される', () => {
    render(<ProgressLoader progress={75} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toHaveAttribute('data-value', '75')
    expect(progressElement).toHaveAttribute('aria-valuenow', '75')
    expect(screen.getByText('Progress: 75%')).toBeInTheDocument()
  })

  it('プログレス値が0の場合も正しく表示される', () => {
    render(<ProgressLoader progress={0} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toHaveAttribute('data-value', '0')
    expect(screen.getByText('Progress: 0%')).toBeInTheDocument()
  })

  it('プログレス値が100の場合も正しく表示される', () => {
    render(<ProgressLoader progress={100} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toHaveAttribute('data-value', '100')
    expect(screen.getByText('Progress: 100%')).toBeInTheDocument()
  })

  it('適切なaria属性が設定される', () => {
    render(<ProgressLoader progress={60} />)

    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toHaveAttribute('aria-valuemin', '0')
    expect(progressElement).toHaveAttribute('aria-valuemax', '100')
    expect(progressElement).toHaveAttribute('aria-valuenow', '60')
  })

  it('プログレス値が未定義の場合も動作する', () => {
    render(<ProgressLoader />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toBeInTheDocument()
    expect(progressElement).toHaveAttribute('aria-valuenow', '0')
  })

  it('負の値が渡された場合も表示される', () => {
    render(<ProgressLoader progress={-10} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toHaveAttribute('data-value', '-10')
    expect(screen.getByText('Progress: -10%')).toBeInTheDocument()
  })

  it('100を超える値が渡された場合も表示される', () => {
    render(<ProgressLoader progress={150} />)

    const progressElement = screen.getByTestId('progress')
    expect(progressElement).toHaveAttribute('data-value', '150')
    expect(screen.getByText('Progress: 150%')).toBeInTheDocument()
  })
})
