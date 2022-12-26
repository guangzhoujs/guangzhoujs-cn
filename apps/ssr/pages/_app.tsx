import '../styles/tailwind.css'
import 'antd/dist/antd.css'
import '../styles/app.scss'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css'
import { RootStoreProvider } from '@/providers/RootStoreProvider'
import BackToTop from '@/components/BackToTop'
import { Suspense, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import NextProgress from 'next-progress'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { useCity } from '@/hooks/common'
import { StoreKey } from '@/config'
import { isBrowser } from '@/utils'

const loading = (
  <div className="loader-container">
    <div className="loader" />
  </div>
)

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>()
  const [isLogined, setIsLogined] = useState<boolean>(false)
  const { cityInfo } = useCity()
  const [city, setCity] = useState<any>()
  const fuser = isBrowser() && localStorage.getItem(StoreKey)

  // 城市信息
  useEffect(() => {
    if (cityInfo?.code) {
      setCity(cityInfo)
    }
  }, [cityInfo])

  // 用户信息
  useEffect(() => {
    if (fuser) {
      const userInfo = JSON.parse(fuser)
      setUser(userInfo)
      setIsLogined(true)
    } else {
      setUser(null)
      setIsLogined(false)
    }
  }, [fuser])

  return (
    <>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <Suspense fallback={loading}>
        <ConfigProvider locale={zhCN}>
          <RootStoreProvider hydrationData={{ user, isLogined, city, setIsLogined }}>
            <Component {...pageProps} />
            <BackToTop />
          </RootStoreProvider>
        </ConfigProvider>
      </Suspense>
    </>
  )
}

export default MyApp
