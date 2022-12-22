import React from 'react'
import { Card, Col, Row } from 'antd'
// import Image from 'next/image'
import AppConfig from '@/config'
import UserLayout from '@/layouts/user'
import Head from 'next/head'
import data from './data'
import classNames from 'classnames'

const Profile = () => {
  const { title, description } = AppConfig
  // const data = new Array(10).fill(1)

  return (
    <UserLayout>
      <Head>
        <title>个人资料 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-page-bg app-user-setting-model">
        <Card title="我的应用" bordered={false}>
          <Row gutter={[20, 20]}>
            {data.map((item, index) => {
              return (
                <Col key={index} span={6} className="col-applist-item">
                  <a className="item-url flex flex-col justify-center items-center" href={item.url} target="_blank" rel="noreferrer">
                    <div className={classNames('app-icon shadow-md', item.bg)}>{item.name}</div>
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                  </a>
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
