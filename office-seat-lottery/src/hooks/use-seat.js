import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export function useSeats() {
  const [boxes, setBoxes] = useState([])
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })

  const fetchSeats = useCallback(async (endpoint, dateStr = null) => {
    try {
      const url = dateStr ? `${endpoint}?date=${dateStr}` : endpoint
      const res = await fetch(url)
      
      if (res.ok) {
        const seats = await res.json()
        const mappedSeats = seats.map(seat => ({
          id: seat.seatId,
          name: seat.name ?? `${seat.tableId}${seat.seatNumber}` ?? '',
          status: getStatusString(seat.status),
          x: seat.imageX ?? 0,
          y: seat.imageY ?? 0,
        }))
        setBoxes(mappedSeats)
        return mappedSeats
      } 
        setBoxes([])
        return []
      
    } catch (_error) {
      setBoxes([])
      return []
    }
  }, [])

  const saveSeats = useCallback(async (boxes) => {
    try {
      const res = await fetch('/api/seats/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boxes }),
      })
      
      if (res.ok) {
        toast.success('保存しました！')
        return true
      } 
        toast.error('保存に失敗しました')
        return false
      
    } catch (_error) {
      toast.error('保存に失敗しました')
      return false
    }
  }, [])

  const exitSeat = useCallback(async (seatId) => {
    try {
      const res = await fetch('/api/seats/map', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId }),
      })
      
      if (res.ok) {
        setBoxes(prev => prev.filter(b => b.id !== seatId))
        toast.success('席を解放しました')
        return true
      } 
        toast.error('解放に失敗しました')
        return false
      
    } catch (_error) {
      toast.error('解放に失敗しました')
      return false
    }
  }, [])

  const updateBox = useCallback((id, updates) => {
    setBoxes(prev => prev.map(b => 
      b.id === id ? { ...b, ...updates } : b
    ))
  }, [])

  const deleteBox = useCallback((id) => {
    setBoxes(prev => prev.filter(b => b.id !== id))
  }, [])

  const addBox = useCallback((tableName, imgSize) => {
    const nextId = Date.now()
    const offset = 8
    const boxW = 100
    const boxH = 40
    const gap = 8
    const plusSize = 32
    
    const aCount = boxes.filter(b => 
      new RegExp(`^${tableName}\\d+$`).test(b.name)
    ).length
    
    const name = `${tableName}${aCount + 1}`
    const x = imgSize.width - offset - plusSize - gap - boxW
    const y = offset + boxH
    
    const newBox = { id: nextId, name, status: 'movable', x, y }
    setBoxes(prev => [...prev, newBox])
    return newBox
  }, [boxes])

  const handleImgLoad = useCallback((e) => {
    setImgSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
  }, [])

  return {
    boxes,
    setBoxes,
    imgSize,
    fetchSeats,
    saveSeats,
    exitSeat,
    updateBox,
    deleteBox,
    addBox,
    handleImgLoad
  }
}

function getStatusString(status) {
  switch (status) {
    case 1: return 'movable'
    case 2: return 'fixed'
    case 3: return 'unused'
    case 4: return 'reserved'
    default: return 'movable'
  }
}
