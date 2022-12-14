import React from 'react'
import { Dropdown, Menu, Space } from 'antd'
import { ProfileOutlined, HomeOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { StoreKey } from '@/config'
import { useRootStore } from '@/providers/RootStoreProvider'
import { isBrowser } from '@/utils'
import Router from 'next/router'

const toHome = (appStore: any) => {
  if (isBrowser()) {
    appStore.hydrate({ user: null, isLogined: false })
    localStorage.removeItem(StoreKey)
    localStorage.removeItem(`${StoreKey}-token`)
  }

  setTimeout(() => {
    Router.push({ pathname: '/' })
    window.location.reload()
  }, 1000)
}

const onDropMenu = (e: any, appStore: any) => {
  if (e.key === 'logout') {
    toHome(appStore)
  }
}

const UserInfo = ({ user }: any) => {
  const { appStore } = useRootStore()

  const dropMenu = (
    <Menu className="app-overlay-menu" onClick={(e: any) => onDropMenu(e, appStore)}>
      <Menu.Item key="index">
        <Space>
          <ProfileOutlined />
          <Link href="/user/article">
            <span>我的文章</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space>
          <HomeOutlined />
          <Link href="/user/job">
            <span>我的招聘</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="settings">
        <Space>
          <SettingOutlined />
          <Link href="/user/profile">
            <span>个人资料</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="settings">
        <Space>
          <SettingOutlined />
          <Link href="/user/account">
            <span>账号设置</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Space>
          <LoginOutlined />
          <span>退出登录</span>
        </Space>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={dropMenu} placement="bottom">
      <div>{user.nick_name}</div>
    </Dropdown>
  )
}

export default UserInfo
