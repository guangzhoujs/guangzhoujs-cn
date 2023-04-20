import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Input, Row, Col, Popconfirm, Space, Image } from 'antd'
import { useRootStore } from '@/providers/RootStoreProvider'
import { fetchUser, fetchUserInfo } from '@/api/home'
import { setServiceToken } from '@/utils/request'
import AppUpload from '@/components/AppUpload'
import AppConfig, { Fallback } from '@/config'
import UserLayout from '@/layouts/user'
import { notice } from '@/utils'
import Router from 'next/router'
import { Method } from 'axios'
import Head from 'next/head'

const { TextArea } = Input

const defaultInit = {
}

type PageProps = {
  user: any
  code: number
}

export default function Profile({ user, code }: PageProps) {
  const { title, description } = AppConfig
  const { appStore } = useRootStore()
  const [data, setData] = useState<any>(user)
  const [loading2, setLoading2] = useState(false)
  const [form] = Form.useForm()
  const { validateFields } = form
  const isEdit = 1
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // 上传配置
  const uploadConfig = {
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    action: `${API_URL}/web/uploadImage`,
    showUploadList: false,
  }
  console.log('user222', user)

  useEffect(() => {
    if (code === 20002) {
      appStore.logout()

      setTimeout(() => {
        Router.push({ pathname: '/' })
      }, 3000)
    }
  }, [code])

  useEffect(() => {
    form.setFieldsValue(Object.assign(user, defaultInit))

    if (!user.username) {
      appStore.logout()

      setTimeout(() => {
        Router.push({ pathname: '/' })
      }, 3000)
    }
  }, [user])

  const handleFinish = (params: any) => {
    let method: Method = 'post'
    let txt = '新增成功'
    const id = params?.id
    setLoading2(true)

    if (isEdit) {
      method = 'patch'
      txt = '修改成功'
    }

    const fParams = { id, type: method, params }
    fetchUser(fParams).then(() => {
      notice({ message: txt })
    }).finally(() => {
      setLoading2(false)
    })
  }

  const onFinish = () => {
    validateFields().then((values: any) => {
      handleFinish(values)
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onDelImg = (url: string) => {
    console.log('url', url)
    setData({ avatar: '' })
    form.setFieldsValue({ avatar: '' })
  }

  // 上传成功
  const onUploadSuccess = ({ url }: { url: string }) => {
    setData({ avatar: url })
    form.setFieldsValue({ avatar: url })
  }

  // 上传失败
  const onUploadFail = () => { }

  return (
    <UserLayout>
      <Head>
        <title>{`个人资料 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-page-bg app-user-setting-model">
        <Card title="个人资料" bordered={false}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            initialValues={defaultInit}
            onFinish={onFinish}
            requiredMark={false}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="id" noStyle>
              <Input hidden />
            </Form.Item>
            <Row>
              <Col span={16}>
                <Form.Item label="用户名" name="username">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="邮件" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="昵称" name="nick_name" rules={[{ required: true, message: '请输入昵称!' }]}>
                  <Input placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item label="Github" name="github" rules={[{ required: true, message: '请输入github!' }]}>
                  <Input placeholder="请输入github" />
                </Form.Item>
                <Form.Item label="Gitee" name="gitee" rules={[{ required: true, message: '请输入gitee!' }]}>
                  <Input placeholder="请输入gitee" />
                </Form.Item>
                <Form.Item label="Juejin" name="juejin" rules={[{ required: true, message: '请输入juejin!' }]}>
                  <Input placeholder="请输入juejin" />
                </Form.Item>
                <Form.Item label="Bilibili" name="bilibili" rules={[{ required: true, message: '请输入bilibili!' }]}>
                  <Input placeholder="请输入bilibili" />
                </Form.Item>
                <Form.Item label="Zhihu" name="zhihu" rules={[{ required: true, message: '请输入zhihu!' }]}>
                  <Input placeholder="请输入zhihu" />
                </Form.Item>
                {/* <Form.Item label="Weixin" name="weixin" rules={[{ required: true, message: '请输入weixin!' }]}>
                  <Input placeholder="请输入weixin" />
                </Form.Item> */}
                <Form.Item label="个人介绍" name="description" rules={[{ required: true, message: '请输入个人介绍!' }]}>
                  <TextArea showCount maxLength={100} autoSize={{ minRows: 3, maxRows: 5 }} placeholder="请输入个人介绍" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
                  <Button type="primary" size="large" className="w-32" loading={loading2} htmlType="submit"> 保存 </Button>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="avatar" noStyle>
                  {data?.avatar.length > 0 ? (
                    <div className="upload-image">
                      <Space direction="vertical" size={15} className="thumb-space">
                        <Image
                          fallback={Fallback}
                          width={150}
                          height={150}
                          src={API_URL + data.avatar}
                        />
                        <Popconfirm title="确定要删除吗?" onConfirm={() => onDelImg(data?.avatar)}>
                          <Button type="default" danger size="small">删除</Button>
                        </Popconfirm>
                      </Space>
                    </div>
                  ) : <AppUpload title="上传图片" config={uploadConfig} onSuccess={onUploadSuccess} onFail={onUploadFail} />}
                  <div className="mt-3 text-xs text-gray-400 font-mono">支持jpg、png、jpeg大小 2M 以内的图片</div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </UserLayout>
  )
}

export async function getServerSideProps({ req }: any) {
  // 保存token到客户端header
  setServiceToken(req)

  try {
    const { info: user } = await fetchUserInfo()
    console.log('user', user)
    return { props: { user } }
  } catch (err: any) {
    if (err.response) {
      return { props: err.response.data }
    }
  }
}
