import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LotteryResult } from '@/components/lottery/lottery-result'

describe('LotteryResult', () => {
  it('resultがnullの場合、何も表示されない', () => {
    const { container } = render(<LotteryResult result={null} />)

    expect(container.firstChild).toBeNull()
  })

  it('resultがundefinedの場合、何も表示されない', () => {
    const { container } = render(<LotteryResult result={undefined} />)

    expect(container.firstChild).toBeNull()
  })

  it('resultが空文字の場合、何も表示されない', () => {
    const { container } = render(<LotteryResult result="" />)

    expect(container.firstChild).toBeNull()
  })

  it('resultがある場合、結果が表示される', () => {
    const result = 'あなたの席は A-5 です！'
    
    render(<LotteryResult result={result} />)

    expect(screen.getByText('あなたの席は A-5 です！')).toBeInTheDocument()
  })

  it('結果が適切なスタイルで表示される', () => {
    const result = '席番号: B-12'
    
    render(<LotteryResult result={result} />)

    const resultElement = screen.getByText('席番号: B-12')
    expect(resultElement).toBeInTheDocument()
    expect(resultElement).toHaveClass('font-bold', 'text-xl')
  })

  it('コンテナに適切なCSSクラスが適用される', () => {
    const result = 'テスト結果'
    
    render(<LotteryResult result={result} />)

    const container = screen.getByText('テスト結果').closest('div')
    expect(container).toHaveClass('mt-6', 'p-4', 'bg-muted', 'rounded-lg', 'text-center')
  })

  it('長い結果文字列も正しく表示される', () => {
    const longResult = 'おめでとうございます！抽選の結果、あなたの席は窓際の特等席 A-1 に決定いたしました。'
    
    render(<LotteryResult result={longResult} />)

    expect(screen.getByText(longResult)).toBeInTheDocument()
  })

  it('数値の結果も文字列として表示される', () => {
    const numericResult = 123
    
    render(<LotteryResult result={numericResult} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('特殊文字を含む結果も正しく表示される', () => {
    const specialResult = '席番号: A-1 (★VIP席★)'
    
    render(<LotteryResult result={specialResult} />)

    expect(screen.getByText('席番号: A-1 (★VIP席★)')).toBeInTheDocument()
  })

  it('HTMLタグが含まれていても安全に表示される', () => {
    const htmlResult = '<script>alert("test")</script>席番号: A-1'
    
    render(<LotteryResult result={htmlResult} />)

    // HTMLタグがそのまま文字列として表示されることを確認
    expect(screen.getByText('<script>alert("test")</script>席番号: A-1')).toBeInTheDocument()
  })
})
