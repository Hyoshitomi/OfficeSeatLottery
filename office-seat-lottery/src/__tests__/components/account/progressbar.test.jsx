import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProgressBar } from '@/components/account/progressbar'

// Progressコンポーネントのモック
jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }) => (
    <div
      data-testid="progress-bar"
      data-value={value}
      className={className}
      role="progressbar"
      aria-valuenow={value}
    >
      Progress: {value}%
    </div>
  )
}))

describe('ProgressBar', () => {
  it('isLoading=falseの場合、何も表示されない', () => {
    const { container } = render(
      <ProgressBar isLoading={false} progress={50} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('isLoading=trueの場合、プログレスバーが表示される', () => {
    render(<ProgressBar isLoading={true} progress={75} />)

    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('data-value', '75')
  })

  it('プログレス値が正しく渡される', () => {
    render(<ProgressBar isLoading={true} progress={30} />)

    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '30')
    expect(screen.getByText('Progress: 30%')).toBeInTheDocument()
  })

  it('プログレス値が0の場合も正しく表示される', () => {
    render(<ProgressBar isLoading={true} progress={0} />)

    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveAttribute('data-value', '0')
  })

  it('プログレス値が100の場合も正しく表示される', () => {
    render(<ProgressBar isLoading={true} progress={100} />)

    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveAttribute('data-value', '100')
  })

  it('適切なCSSクラスが適用される', () => {
    render(<ProgressBar isLoading={true} progress={50} />)

    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveClass('h-3')
  })
})
