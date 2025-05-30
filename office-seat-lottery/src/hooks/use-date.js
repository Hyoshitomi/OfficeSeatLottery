import { useState, useCallback } from 'react'

export function useDate(initialDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState(initialDate)

  const getDateString = useCallback((date = selectedDate) => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [selectedDate])

  const setToday = useCallback(() => {
    setSelectedDate(new Date())
  }, [])

  return {
    selectedDate,
    setSelectedDate,
    getDateString,
    setToday
  }
}
