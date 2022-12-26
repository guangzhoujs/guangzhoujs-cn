import { useEffect, useRef } from 'react'
import { useLocalStorageState, useSetState } from 'ahooks'
import { fetchArticleCategory, fetchTagsList } from '@/api/home'
import { CITY_CODE, StoreKey } from '@/config'
import data from '@/public/mock/city.json'
// import qs from 'qs'

export const useMounted = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return () => mountedRef.current
}

// 当前城市信息
export function useCity() {
  const city = data.find((item: any) => item.code === +CITY_CODE)
  return { cityInfo: city }
}

// 当前用户信息
export function useUserInfo() {
  const [local] = useLocalStorageState(StoreKey, {})
  return { ...(local as object) }
}

// 分类列表
export function useArticleCategory(params?: any) {
  const [state, setState] = useSetState<{ categoryList: any, loading: boolean, run: any }>({ categoryList: [], loading: false, run: () => { } })
  const isMounted = useMounted()

  useEffect(() => {
    const fetchData = async () => {
      const { rows } = await fetchArticleCategory(params)

      if (!isMounted() || !rows) {
        return
      }

      setState({ categoryList: rows[0]?.children, loading: false })
    }

    setState({ loading: true, run: fetchData })
    fetchData()
  }, [])

  return state
}

// 分类列表
export function useTags(params?: any) {
  const [state, setState] = useSetState<{ tagsList: any, loading: boolean, run: any }>({ tagsList: [], loading: false, run: () => { } })
  const isMounted = useMounted()

  useEffect(() => {
    const fetchData = async () => {
      const { rows } = await fetchTagsList(params)

      if (!isMounted()) {
        return
      }

      setState({ tagsList: rows, loading: false })
    }

    setState({ loading: true, run: fetchData })
    fetchData()
  }, [])

  return state
}
