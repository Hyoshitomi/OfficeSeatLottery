import { useState, useRef, useCallback } from 'react'

export function useImage(initialImage = '/sheet/座席表.png') {
  const [previewImage, setPreviewImage] = useState(initialImage)
  const fileInputRef = useRef(null)

  const handleFileChange = useCallback((file) => {
    setPreviewImage(URL.createObjectURL(file))
  }, [])

  const getAbsoluteUrl = useCallback((url) => {
    if (/^https?:\/\//.test(url)) return url
    return window.location.origin + url
  }, [])

  return {
    previewImage,
    setPreviewImage,
    fileInputRef,
    handleFileChange,
    getAbsoluteUrl
  }
}
