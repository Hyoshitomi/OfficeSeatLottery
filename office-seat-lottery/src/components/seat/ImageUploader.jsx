'use client'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function ImageUploader({ onChange }) {
  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = e => {
    const file = e.target.files?.[0]
    file && onChange(file)
  }

  return (
    <>
      <Button onClick={handleButtonClick}>画像を変更</Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  )
}
