import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PasswordRequirements } from '@/components/account/password-requirements'

describe('PasswordRequirements', () => {
  const mockGetRequirementColor = jest.fn()

  const defaultRequirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetRequirementColor.mockReturnValue('text-gray-500')
  })

  it('パスワード要件のタイトルが表示される', () => {
    render(
      <PasswordRequirements
        requirements={defaultRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={false}
      />
    )

    expect(screen.getByText('パスワード要件:')).toBeInTheDocument()
  })

  it('すべての要件項目が表示される', () => {
    render(
      <PasswordRequirements
        requirements={defaultRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={false}
      />
    )

    expect(screen.getByText('8文字以上')).toBeInTheDocument()
    expect(screen.getByText('大文字を含む')).toBeInTheDocument()
    expect(screen.getByText('小文字を含む')).toBeInTheDocument()
    expect(screen.getByText('数字を含む')).toBeInTheDocument()
    expect(screen.getByText('特殊文字を含む (!?_$#)')).toBeInTheDocument()
  })

  it('要件が満たされている場合、チェックアイコンが表示される', () => {
    const satisfiedRequirements = {
      length: true,
      uppercase: true,
      lowercase: false,
      number: false,
      special: false
    }

    render(
      <PasswordRequirements
        requirements={satisfiedRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={false}
      />
    )

    // チェックアイコンの数を確認（lengthとuppercaseが満たされている）
    const checkIcons = document.querySelectorAll('svg[class*="check"]')
    expect(checkIcons).toHaveLength(2)
  })

  it('バリデーション試行後、満たされていない要件にXアイコンが表示される', () => {
    render(
      <PasswordRequirements
        requirements={defaultRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={true}
      />
    )

    // Xアイコンの数を確認（すべての要件が満たされていない）
    const xIcons = document.querySelectorAll('svg.lucide-x')
    expect(xIcons).toHaveLength(5)
  })

  it('バリデーション未試行時、満たされていない要件にアイコンが表示されない', () => {
    render(
      <PasswordRequirements
        requirements={defaultRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={false}
      />
    )

    // アイコンが表示されていないことを確認
    const xIcons = document.querySelectorAll('svg[data-icon="x"]')
    expect(xIcons).toHaveLength(0)
  })

  it('getRequirementColorが各要件に対して呼ばれる', () => {
    render(
      <PasswordRequirements
        requirements={defaultRequirements}
        getRequirementColor={mockGetRequirementColor}
        validationAttempted={false}
      />
    )

    // 各要件に対してgetRequirementColorが呼ばれることを確認
    expect(mockGetRequirementColor).toHaveBeenCalledTimes(5)
  })
})
