import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function useEmployees(user) {
  const [employeeList, setEmployeeList] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])

  useEffect(() => {
    fetchEmployees()
  }, [user])

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/user/appoint')
      if (res.ok) {
        const data = await res.json()
        setEmployeeList(data)
      } else {
        throw new Error('Failed to fetch employees')
      }
    } catch (_error) {
      toast.error('社員リストの取得に失敗しました')
      setEmployeeList([])
    }
  }

  return {
    employeeList,
    selectedEmployees,
    setSelectedEmployees,
    isAdmin: user?.adminFlag
  }
}
