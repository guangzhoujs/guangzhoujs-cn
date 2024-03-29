import React, { FC, useState } from 'react'
import { Form, Modal, Input, Row, Button, message, Checkbox } from 'antd'
import { fetchRegister } from '@/api/home'
import { Method } from 'axios'
import { CITY_CODE } from '@/config'

interface Iprops {
  isForgotPassword: boolean
  setIsForgotPassword: any
  setIsLogin: any
}

const ForgotPassword: FC<Iprops> = ({ isForgotPassword, setIsForgotPassword, setIsLogin }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { validateFields } = form
  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { whitespace: true, message: '姓名不能为空' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符' },
    ],
    email: [
      { required: true, message: '请输入邮箱' },
      { whitespace: true, message: '姓名不能为空' },
      { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确' },
      { max: 50, message: '邮箱不得超过50字符' },
    ],
  }

  const afterClose = () => {
    form.resetFields()
  }

  // 处理注册
  const handleFinish = (params: any) => {
    const method: Method = 'post'
    const txt = '注册成功，请登录'
    setLoading(true)

    const fParams = { type: method, params }
    fetchRegister(fParams).then(() => {
      message.success(txt)

      setTimeout(() => {
        setIsForgotPassword(false)
        setIsLogin(true)
        form.resetFields()
      }, 500)
    }).catch((err) => {
      console.warn(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const defalutValue = {
    city_code: CITY_CODE,
    birthday: '1970-01-01 20:51:57',
  }

  // 提交
  const onFinish = () => {
    validateFields().then(async (values: any) => {
      Object.assign(values, { ...defalutValue })
      handleFinish(values)
    })
  }

  // 取消
  const handleCancel = () => {
    setIsForgotPassword(false)
    setLoading(false)
  }

  // 跳转注册
  const toLogin = () => {
    setIsLogin(true)
    setIsForgotPassword(false)
  }

  const initialValues = {
  }

  return (
    <Modal title="找回密码" className="app-register-dialog" forceRender open={isForgotPassword} onOk={onFinish} width={450} footer={null} destroyOnClose onCancel={handleCancel} afterClose={afterClose}>
      <Form className="app-login-form" size="large" name="basic" layout="vertical" autoComplete="off" validateTrigger="onBlur" form={form} preserve={false} requiredMark={false} onFinish={onFinish} initialValues={initialValues}>
        <Form.Item name="username" rules={rules.username}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="email" rules={rules.email}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <div className="app-form-register flex justify-between items-center mb-5">
          <Button type="link" className="-ml-4" onClick={toLogin}>使用已有帐号登录</Button>
          <Button type="primary" className="w-28" htmlType="submit" size="large" loading={loading}> 注册 </Button>
        </div>
        <Form.Item className="none">
          <Checkbox style={{ color: '#ccc' }}>我已阅读并同意《<a>用户服务协议</a>》</Checkbox>
        </Form.Item>
        <Row className="mb-5 none">
          <Button block size="large" type="primary" htmlType="submit" loading={loading}> 提交 </Button>
        </Row>
        <Row className="auth-action justify-between none">
          <Button type="link">注册</Button>
          <Button type="link">找回密码</Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default ForgotPassword
