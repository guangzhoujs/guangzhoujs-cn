import React from 'react'
import { Layout } from 'antd'
import SiderMenu from './Menu'
import { observer } from 'mobx-react'
import Logo from '@/public/images/logo.png'
import Image from 'next/image'
import { useRootStore } from '@/providers/RootStoreProvider'
import Link from 'next/link'

const { Sider } = Layout

export default observer(function AppSider() {
  const { appStore: { collapsed } } = useRootStore()

  return (
    <Sider width={200} theme="light" collapsed={collapsed} className={`app-sider ${!collapsed ? '' : 'app-sider-on'}`}>
      <div className={`app-logo shadow-md ${!collapsed ? '' : 'app-logo-on'}`}>
        <div className="logo-wrap">
          <Link href="/">
            <a target="_blank" href="/" rel="noreferrer">
              <Image alt="Vercel logo" src={Logo} width={45} height={45} />
            </a>
          </Link>
        </div>
      </div>
      <SiderMenu />
    </Sider>
  )
})
