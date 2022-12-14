import React from 'react'
import { Layout } from 'antd'
import { useRootStore } from '@/providers/RootStoreProvider'
import SiderMenu from './Menu'
import { observer } from 'mobx-react'

const { Sider } = Layout

export default observer(function AppSider() {
  const { appStore: { collapsed } } = useRootStore()

  return (
    <Sider width={200} theme="light" collapsed={collapsed} className={`app-sider ${!collapsed ? '' : 'app-sider-on'}`}>
      <SiderMenu />
    </Sider>
  )
})
