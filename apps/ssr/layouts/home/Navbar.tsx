import { useState } from 'react'
import { Button, Input } from 'antd'
import { useRootStore } from '@/providers/RootStoreProvider'
import { IsBrowser } from '@/components/IsBrowser'
import { Search } from '@carbon/icons-react'
import { observer } from 'mobx-react-lite'
import UserInfo from '../common/UserInfo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Login from './Login'
import Register from './Register'
import config from '@/config'

const navItems: { label: string, page?: string, link?: string }[] = [
  { label: '首页', page: '/' },
  { label: '文章', page: '/article/category/0' },
  { label: '招聘', page: '/job' },
  { label: '英雄榜', page: '/hero' },
]

export default observer(function Header() {
  const { pathname } = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const { appStore: { isLogined, user } } = useRootStore()

  const onSearch = () => {
    alert('search')
  }

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
            <span>
              <a href="/">{config.title}</a>
            </span>
          </div>
          <div className="app-header-nav">
            {navItems.map(({ label, page }: any) => {
              const cur = page.includes('article') ? '/article/category/[category_id]' : page

              return (
                <Link href={page} key={label}>
                  <a className={pathname === cur ? 'active nav-link' : 'nav-link'}>{label}</a>
                </Link>
              )
            })}
          </div>
          <div className="app-header-search">
            <div className="auto-suggest">
              <Input type="text" placeholder="请输入关键词搜索…" onPressEnter={() => onSearch()} className="search-input" />
            </div>
            <Button className="btn search-to" onClick={onSearch}>
              <Search />
            </Button>
          </div>
          <div className="app-header-user -mr-1">
            <IsBrowser>
              {isLogined ? logined : notLogin}
            </IsBrowser>
          </div>
        </div>
      </div>
    </div>
  )
})
