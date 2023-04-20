import { isBrowser } from '@/utils'
import { getToken } from '@/utils/auth'
import { Layout } from 'antd'
import Router from 'next/router'
import { useEffect } from 'react'
import Footer from '../common/Footer'
import AppContent from './Content'
import AppHeader from './Header'
import AppSider from './Sider'

export default function UserLayout({ children }: any) {
  const token = isBrowser() && getToken()

  // 用户信息
  useEffect(() => {
    if (!token) {
      Router.push({ pathname: '/' })

      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
    }
  }, [])

  return (
    <Layout className="app-user-box">
      <AppHeader />
      <Layout className="app-user-layout container">
        <AppSider />
        <AppContent propChildren={children} />
      </Layout>
      <Footer />
    </Layout>
  )
}
