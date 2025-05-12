'use client'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function SaveButton({ onClick }) {
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
        <Button className="w-[90%]" onClick={handleButtonClick}>保存</Button>
      </>
    )
  }
