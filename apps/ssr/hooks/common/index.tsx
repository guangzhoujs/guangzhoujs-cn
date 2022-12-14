import { useEffect, useRef } from 'react'
import { useLocalStorageState, useSetState } from 'ahooks'
import { fetchArticleCategory, fetchTagsList } from '@/api/home'
import { CITY_CODE, StoreKey } from '@/config'
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
  const [state, setState] = useSetState<{ cityInfo: any, loading: boolean, run: any }>({ cityInfo: {}, loading: false, run: () => { } })

  useEffect(() => {
    const fetchData = async () => {
      fetch('/mock/city.json')
        .then((response) => response.json())
        .then((res: any) => {
          const city = res.find((item: any) => item.code === +CITY_CODE)
          setState({ cityInfo: city || {}, loading: false })
        })
        .catch(() => { console.log('error') })
    }

    setState({ loading: true, run: fetchData })
    fetchData()
  }, [])

  return state
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

      if (!isMounted()) {
        return
      }

      setState({ categoryList: rows[0].children, loading: false })
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
