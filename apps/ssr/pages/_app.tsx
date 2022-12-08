import '../styles/tailwind.css'
import 'antd/dist/antd.css'
import '../styles/app.scss'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css'
import type { AppProps } from 'next/app'
import NextProgress from 'next-progress'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { RootStoreProvider } from '@/providers/RootStoreProvider'
import { useEffect, useState } from 'react'
import { useCity } from '@/hooks/common'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState()
  const [isLogined, setIsLogined] = useState<boolean>(false)
  const { cityInfo } = useCity()
  const [city, setCity] = useState()

  // 城市信息
  useEffect(() => {
    if (cityInfo.code) {
      setCity(cityInfo)
    }
  }, [cityInfo])

  // 用户信息
  useEffect(() => {
    const fuser = localStorage.getItem('f2e.user')

    if (fuser) {
      const userInfo = JSON.parse(localStorage.getItem('f2e.user') || '{}')
      setUser(userInfo)
      setIsLogined(true)
    }
  }, [])

  return (
    <>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <ConfigProvider locale={zhCN}>
        <RootStoreProvider hydrationData={{ user, isLogined, city }}>
          <Component {...pageProps} />
        </RootStoreProvider>
      </ConfigProvider>
    </>
  )
}

export default MyApp
