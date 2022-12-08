import { Dropdown, Menu, Space } from 'antd'
import React from 'react'
import { ProfileOutlined, HomeOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import Link from 'next/link'

const onDropMenu = (e: any) => {
  if (e.key === 'uppassword') {
    // setIsUppasswordShow(true)
  }
  if (e.key === 'logout') {
    // userStore.logout()
    localStorage.removeItem('v5-user')
    // toLogin()
  }
}

const UserInfo = ({ user }: any) => {
  const dropMenu = (
    <Menu className="app-overlay-menu" onClick={onDropMenu}>
      <Menu.Item key="index">
        <Space>
          <ProfileOutlined />
          <Link href="/user/article">
            <span>我的文章</span>
          </Link>
        </Space>
      </Menu.Item>
      <Menu.Item key="uppassword">
        <Space>
          <HomeOutlined />
          <Link href={`/user/${user.id}`}>
            <span>我的主页</span>
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
    <Dropdown overlay={dropMenu} placement="bottomRight">
      <span>{user.nick_name}</span>
    </Dropdown>
  )
}

export default UserInfo
