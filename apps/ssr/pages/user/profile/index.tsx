import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Input, Row, Col, Popconfirm, Space } from 'antd'
import Image from 'next/image'
import AppConfig from '@/config'
import AppUpload from '@/components/AppUpload'
import UserLayout from '@/layouts/user'
import { fetchUser } from '@/api/home'
import { Method } from 'axios'
import Head from 'next/head'
import { getUserInfo, notice } from '@/utils'

const { TextArea } = Input

const defaultInit = {
  github: 'http://github.com/jikeytang',
  gitee: 'http://gitee.com/jikeytang',
  juejin: 'http://juejin.cn/jikeytang',
  bilibili: 'http://bilibili.com/jikeytang',
  zhihu: 'http://zhihu.com/jikeytang',
}

const Profile = () => {
  const { title, description } = AppConfig
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const user = getUserInfo()
      const info = await fetchUser({ id: user?.id })
      setData({ id: user?.id })

      if (info) {
        setData(info)
        form.setFieldsValue(Object.assign(info, defaultInit))
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleFinish = (params: any) => {
    let method: Method = 'post'
    let txt = '新增成功'
    const id = data?.id
    setLoading2(true)

    if (isEdit) {
      method = 'patch'
      txt = '修改成功'
    }

    const fParams = { id, type: method, params }
    fetchUser(fParams).then(() => {
      notice({ message: txt })
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
        <title>个人资料 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-user-setting-model">
        <Card title="个人资料" bordered={false} loading={loading}>
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
            <Row>
              <Col span={16}>
                <Form.Item label="用户名" name="username">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="邮件" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="昵称" name="nick_name" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Github" name="github" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Gitee" name="gitee" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Juejin" name="juejin" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Bilibili" name="bilibili" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Zhihu" name="zhihu" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item>
                {/* <Form.Item label="Weixin" name="weixin" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input />
                </Form.Item> */}
                <Form.Item label="个人介绍" name="description" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <TextArea showCount maxLength={100} autoSize={{ minRows: 3, maxRows: 5 }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
                  <Button type="primary" loading={loading2} htmlType="submit"> 保存 </Button>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="avatar" noStyle>
                  {data.avatar ? (
                    <div className="upload-image">
                      <Space direction="vertical" size={15} className="thumb-space">
                        <Image width={150} height={150} src={API_URL + data.avatar} />
                        <Popconfirm title="确定要删除吗?" onConfirm={() => onDelImg(data.avatar)}>
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

export default Profile
