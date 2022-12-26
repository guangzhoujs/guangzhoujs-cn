import React from 'react'
import { Card, Col, Row } from 'antd'
// import Image from 'next/image'
import AppConfig from '@/config'
import UserLayout from '@/layouts/user'
import Head from 'next/head'
import classNames from 'classnames'
import Link from 'next/link'

const data = [
  {
    name: 'vue',
    title: 'vue-admin.cn',
    url: 'http://vue-admin.cn',
    bg: 'bg-red-700',
    desc: 'vue管理系统收集',
  },
  {
    name: 'REACT',
    title: 'react-admin.cn',
    url: 'http://react-admin.cn',
    bg: 'bg-blue-700',
    desc: 'react管理系统收集',
  },
  {
    name: 'NG',
    title: 'ng-admin.cn',
    url: 'http://ng-admin.cn',
    bg: 'bg-green-700',
    desc: 'angular管理系统收集',
  },
  {
    name: 'VYAN',
    title: 'vyan.top',
    url: 'http://www.vyan.top',
    bg: 'bg-pink-700',
    desc: '微燕企业网站',
  },
]

const Profile = () => {
  const { title, description } = AppConfig
  // const data = new Array(10).fill(1)

  return (
    <UserLayout>
      <Head>
        <title>{`个人资料 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-page-bg app-user-setting-model">
        <Card title="我的应用" bordered={false}>
          <Row gutter={[20, 20]}>
            {data.map((item, index) => {
              return (
                <Col key={index} span={6} className="col-applist-item">
                  <Link className="item-url flex flex-col justify-center items-center" href={item.url} target="_blank" rel="noreferrer">
                    <div className={classNames('app-icon shadow-md', item.bg)}>{item.name}</div>
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </Card>
      </div>
    </UserLayout>
  )
}

export default Profile
