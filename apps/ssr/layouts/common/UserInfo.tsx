import React from 'react'
import { Dropdown, Menu, Space } from 'antd'
import { ProfileOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons'
import { useRootStore } from '@/providers/RootStoreProvider'
import { UserProfile, UserSettings } from '@carbon/icons-react'
import { removeToken } from '@/utils/auth'
import { StoreKey } from '@/config'
import { isBrowser } from '@/utils'
import Router from 'next/router'
import Link from 'next/link'

const toHome = (appStore: any) => {
  if (isBrowser()) {
    appStore.hydrate({ user: null, isLogined: false })
    localStorage.removeItem(StoreKey)
    localStorage.removeItem(`${StoreKey}-token`)
    removeToken()
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
          <Link href="/user/article" legacyBehavior>
            <span>我的文章</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="job">
        <Space>
          <UserAddOutlined />
          <Link href="/user/job" legacyBehavior>
            <span>我的招聘</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="profile">
        <Space>
          <UserProfile />
          <Link href="/user/profile" legacyBehavior>
            <span>个人资料</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="settings">
        <Space>
          <UserSettings />
          <Link href="/user/account" legacyBehavior>
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
