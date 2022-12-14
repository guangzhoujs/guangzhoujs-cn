import React, { useEffect, useState } from 'react'
import { Button, Card, Popconfirm } from 'antd'
import { getUserInfo, isBrowser, notice } from '@/utils'
import { useRootStore } from '@/providers/RootStoreProvider'
import UserLayout from '@/layouts/user'
import { fetchUser } from '@/api/home'
import Router from 'next/router'
import AppConfig, { StoreKey } from '@/config'
import { Method } from 'axios'
import Head from 'next/head'

const Account = () => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const { appStore } = useRootStore()
  const { title, description } = AppConfig

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const user = getUserInfo()
      const info = await fetchUser({ id: user?.id })
      setData({ id: user?.id })

      if (info) {
        setData(info)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const onDel = () => {
    const method: Method = 'delete'
    const id = data?.id
    const params = { id, type: method }

    fetchUser(params).then(() => {
      notice({ message: '注销成功' })

      if (isBrowser()) {
        appStore.hydrate({ user: null, isLogined: false })
        localStorage.removeItem(StoreKey)
        localStorage.removeItem(`${StoreKey}-token`)
      }

      setTimeout(() => {
        Router.push({ pathname: '/' })
        window.location.reload()
      }, 1000)
    })
  }

  return (
    <UserLayout>
      <Head>
        <title>账户设置 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-user-setting-model">
        <Card title="账户设置" bordered={false} loading={loading}>
          <ul className="app-setting-list">
            <li>
              <div className="title">用户名</div>
              <div className="input-box">
                <span className="account">15*****5391</span>
                <div className="action-box">
                  <Button type="link">换绑</Button>
                </div>
              </div>
            </li>
            <li>
              <div className="title">密码</div>
              <div className="input-box">
                <span className="account" />
                <div className="action-box">
                  <Button type="link">重置</Button>
                </div>
              </div>
            </li>
            <li>
              <div className="title">账号注销</div>
              <div className="input-box">
                <span className="account" />
                <div className="action-box">
                  <Popconfirm title="确认要注销账号吗?" onConfirm={() => onDel()}>
                    <Button type="link">注销</Button>
                  </Popconfirm>
                </div>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </UserLayout>
  )
}

export default Account
