'use client'
import { useState, useEffect } from 'react'

export default function NameBoxPopOver({
  id,
  name,
  isFixed,
  onUpdate,
}) {
  const [editName, setEditName] = useState(name)
  const [editFixed, setEditFixed] = useState(isFixed)

  useEffect(() => {
    const t = setTimeout(() => {
      onUpdate?.(id, editName, editFixed)
    }, 300)
    return () => clearTimeout(t)
  }, [id, editName, editFixed, onUpdate])

  return (
    <>
      <label className="block mb-2">
        <span className="text-sm">表示名</span>
        <input
          type="text"
          value={editName}
          onChange={e => setEditName(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1 text-sm"
        />
      </label>
      <div className="mb-2 text-sm">固定／流動</div>
      <div className="flex items-center space-x-2">
        <label className="flex items-center">
          <input
            type="radio"
            name={`fixed-${id}`}
            checked={editFixed}
            onChange={() => setEditFixed(true)}
          />
          <span className="ml-1">固定</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name={`fixed-${id}`}
            checked={!editFixed}
            onChange={() => setEditFixed(false)}
          />
          <span className="ml-1">流動</span>
        </label>
      </div>
    </>
  )
}
