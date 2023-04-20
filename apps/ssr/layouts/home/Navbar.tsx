import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useRootStore } from '@/providers/RootStoreProvider'
import { IsBrowser } from '@/components/IsBrowser'
import HeaderSearch from '../common/Search'
import { observer } from 'mobx-react-lite'
import UserInfo from '../common/UserInfo'
import { useRouter } from 'next/router'
import Logo from '@/components/Logo'
import Register from './Register'
import { isBrowser } from '@/utils'
import { getToken } from '@/utils/auth'

import Link from 'next/link'
import Login from './Login'

const navItems: { label: string, page?: string, link?: string }[] = [
  { label: '首页', page: '/' },
  { label: '文章', page: '/article/category/0' },
  { label: '招聘', page: '/job' },
  { label: '英雄榜', page: '/hero' },
]

export default observer(function Header() {
  const token = isBrowser() && getToken()
  const { pathname } = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const { appStore } = useRootStore()
  const { user } = appStore

  // 用户信息
  useEffect(() => {
    if (!token) {
      appStore.logout()
    }
  }, [])

  const handleOpen = () => {
    setIsLogin(true)
  }

  const onRegister = () => {
    setIsRegister(true)
  }

  // 已登录
  const logined = (
    <UserInfo user={user} />
  )
  // 未登录
  const notLogin = (
    <>
      <Button type="primary" shape="round" className="user" onClick={handleOpen}>登录</Button>
      <Button type="text" className="user ml-3" onClick={onRegister}>注册</Button>
      <Login isLogin={isLogin} setIsLogin={setIsLogin} setIsRegister={setIsRegister} />
      <Register isRegister={isRegister} setIsRegister={setIsRegister} setIsLogin={setIsLogin} />
    </>
  )

  return (
    <div className="app-header shadow-md">
      <div className="app-header-navbar container white shadow-4 border-bottom pc-model">
        <div className="app-header-main">
          <div className="app-header-logo">
            <Logo />
          </div>
          <div className="app-header-nav">
            {navItems.map(({ label, page }: any) => {
              const cur = page.includes('article') ? '/article/category/[category_id]' : page

              return (
                <Link
                  href={page}
                  key={label}
                  className={pathname === cur ? 'active nav-link' : 'nav-link'}
                >
                  {label}
                </Link>
              )
            })}
          </div>
          <div className="app-header-search">
            <HeaderSearch />
          </div>
          <div className="app-header-user -mr-1">
            <IsBrowser>
              {token ? logined : notLogin}
            </IsBrowser>
          </div>
        </div>
      </div>
    </div>
  )
})
