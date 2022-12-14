import { StoreKey } from '@/config'
import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { IGlobalContext } from './IGlobalContext'

const AuthProvider = ({ children }: any) => {
  const [state, setState] = useState<{
    user: any
    isLogined: boolean
  }>({ user: {}, isLogined: false })

  useEffect(() => {
    const fuser = localStorage.getItem(StoreKey)

    if (fuser) {
      const userInfo = JSON.parse(fuser || '{}')
      setState({ user: userInfo, isLogined: true })
    }
  }, [])

  const value: IGlobalContext = useMemo(() => {
    return {
      state,
      setState,
    }
  }, [state, setState])

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}

export const useAuth = () => {
  const {
    state = {},
    setState,
  } = useContext(AuthContext) || {}

  return {
    setState,
    ...state,
  }
}

export default AuthProvider
