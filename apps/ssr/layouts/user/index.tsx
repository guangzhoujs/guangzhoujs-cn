import { StoreKey } from '@/config'
import { isBrowser } from '@/utils'
import { Layout } from 'antd'
import Router from 'next/router'
import { useEffect } from 'react'
import Footer from '../common/Footer'
import AppContent from './Content'
import AppHeader from './Header'
import AppSider from './Sider'

export default function UserLayout({ children }: any) {
  const fuser = isBrowser() && localStorage.getItem(StoreKey)

  // 用户信息
  useEffect(() => {
    if (!fuser) {
      Router.push({ pathname: '/' })
    }
  }, [fuser])

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
