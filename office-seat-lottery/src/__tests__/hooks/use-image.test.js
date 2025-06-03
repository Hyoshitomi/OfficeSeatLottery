import { renderHook, act } from '@testing-library/react'
import { useImage } from '@/hooks/use-image'

// URL.createObjectURLのモック
global.URL.createObjectURL = jest.fn(() => 'mocked-blob-url')

describe('useImage', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })  

  it('デフォルトの初期画像が設定される', () => {
    const { result } = renderHook(() => useImage())
    
    expect(result.current.previewImage).toBe('/sheet/座席表.png')
  })

  it('カスタム初期画像が設定される', () => {
    const customImage = '/custom/image.jpg'
    const { result } = renderHook(() => useImage(customImage))
    
    expect(result.current.previewImage).toBe(customImage)
  })

  it('ファイル変更時にプレビュー画像が更新される', () => {
    const { result } = renderHook(() => useImage())
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    act(() => {
      result.current.handleFileChange(mockFile)
    })
    
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile)
    expect(result.current.previewImage).toBe('mocked-blob-url')
  })

  it('プレビュー画像を直接設定できる', () => {
    const { result } = renderHook(() => useImage())
    const newImage = '/new/image.png'
    
    act(() => {
      result.current.setPreviewImage(newImage)
    })
    
    expect(result.current.previewImage).toBe(newImage)
  })

  it('fileInputRefが正しく設定される', () => {
    const { result } = renderHook(() => useImage())
    
    expect(result.current.fileInputRef).toBeDefined()
    expect(result.current.fileInputRef.current).toBeNull()
  })

  it('絶対URLがそのまま返される', () => {
    const { result } = renderHook(() => useImage())
    const absoluteUrl = 'https://example.com/image.jpg'
    
    const url = result.current.getAbsoluteUrl(absoluteUrl)
    
    expect(url).toBe(absoluteUrl)
  })

  it('相対URLが絶対URLに変換される', () => {
    const { result } = renderHook(() => useImage())
    const relativeUrl = '/images/test.jpg'
    
    const url = result.current.getAbsoluteUrl(relativeUrl)
    
    expect(url).toBe('http://localhost:3000/images/test.jpg')
  })
  

  it('HTTPSのURLがそのまま返される', () => {
    const { result } = renderHook(() => useImage())
    const httpsUrl = 'https://example.com/image.jpg'
    
    const url = result.current.getAbsoluteUrl(httpsUrl)
    
    expect(url).toBe(httpsUrl)
  })

  it('HTTPのURLがそのまま返される', () => {
    const { result } = renderHook(() => useImage())
    const httpUrl = 'http://example.com/image.jpg'
    
    const url = result.current.getAbsoluteUrl(httpUrl)
    
    expect(url).toBe(httpUrl)
  })

  it('空文字列でも正常動作する', () => {
    const { result } = renderHook(() => useImage())
    
    const url = result.current.getAbsoluteUrl('')
    
    expect(url).toBe('http://localhost:3000')
  })
  

  it('複数のファイル変更でも正常動作する', () => {
    const { result } = renderHook(() => useImage())
    
    const files = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.png', { type: 'image/png' }),
      new File(['test3'], 'test3.gif', { type: 'image/gif' })
    ]
    
    files.forEach((file, index) => {
      URL.createObjectURL.mockReturnValueOnce(`mocked-blob-url-${index}`)
      
      act(() => {
        result.current.handleFileChange(file)
      })
      
      expect(result.current.previewImage).toBe(`mocked-blob-url-${index}`)
    })
  })

  it('nullファイルでもエラーが発生しない', () => {
    const { result } = renderHook(() => useImage())
    
    expect(() => {
      act(() => {
        result.current.handleFileChange(null)
      })
    }).not.toThrow()
  })

  it('undefinedファイルでもエラーが発生しない', () => {
    const { result } = renderHook(() => useImage())
    
    expect(() => {
      act(() => {
        result.current.handleFileChange(undefined)
      })
    }).not.toThrow()
  })

  it('プロトコルなしのURLでも正常動作する', () => {
    const { result } = renderHook(() => useImage())
    const protocolLessUrl = '//example.com/image.jpg'
    
    const url = result.current.getAbsoluteUrl(protocolLessUrl)
    
    expect(url).toBe('http://localhost:3000//example.com/image.jpg')
  })
  
})
