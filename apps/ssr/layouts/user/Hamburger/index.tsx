import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { useRootStore } from '@/providers/RootStoreProvider'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const Hamburger: FC = () => {
  const { appStore } = useRootStore()

  const toggleSiderBar = () => {
    appStore.setCollapsed(!appStore.collapsed)
  }

  return (
    <div className="app-hamburger" onClick={toggleSiderBar}>
      {appStore.collapsed ? (<MenuUnfoldOutlined />) : (<MenuFoldOutlined />)}
    </div>
  )
}

export default observer(Hamburger)
