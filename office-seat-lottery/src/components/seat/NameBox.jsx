// components/NameBox.jsx
'use client'
import React from 'react'
import Draggable from 'react-draggable'

export default function NameBox({ name, isFixed = false, onStop }) {
  return (
    <Draggable bounds="parent" onStop={(_, d) => onStop?.(d.x, d.y)}>
      <div className="
        relative
        w-[100px] h-[40px]
        bg-white overflow-hidden
        cursor-grab
      ">
        {/* 文字 */}
        <div className="
          absolute inset-0
          flex items-center justify-center
          text-black font-inter font-normal
          break-words
          text-[clamp(14px,2.5vw,20px)]
        ">
          {name}
        </div>
        {/* 枠線 */}
        <div className={`
          absolute inset-0
          rounded-[7px] border-3 pointer-events-none
          ${isFixed ? 'border-black' : 'border-[#1AA7FF]'}
        `}/>
      </div>
    </Draggable>
  )
}
