import React, { FC, useState } from 'react'
import { Form, Modal, Input, Row, Button, message, Checkbox } from 'antd'
// import { useGlobalContext } from '@/context/useGlobalContext'
import { fetchRegister } from '@/api/home'
import { Method } from 'axios'
// import { useAuth } from '@/context/auth-provider'
import { CITY_CODE } from '@/config'
// import qs from 'qs'

interface Iprops {
  isRegister: boolean
  setIsRegister: any
  setIsLogin: any
}

const Register: FC<Iprops> = ({ isRegister, setIsRegister, setIsLogin }) => {
  const [loading, setLoading] = useState(false)
  // const state = useAuth()
  // console.log('state', state)
  const [form] = Form.useForm()
  const { validateFields } = form
  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { whitespace: true, message: '姓名不能为空' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符' },
    ],
    password: [
      { required: true, message: '请输入密码' },
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
    fetchRegister(fParams).then((res: any) => {
      console.log('res', res)
      message.success(txt)

      setTimeout(() => {
        setIsRegister(false)
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
      delete values.ret_password

      Object.assign(values, { ...defalutValue })
      handleFinish(values)
    })
  }

  // 取消
  const handleCancel = () => {
    setIsRegister(false)
    setLoading(false)
  }

  // 跳转注册
  const toLogin = () => {
    setIsLogin(true)
    setIsRegister(false)
  }

  // 验证确认密码
  const validatePsw = ({ getFieldValue }: any) => ({
    validator: (_: any, value: string) => {
      if (!value) {
        return Promise.reject(new Error('请输入确认密码！'))
      }

      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }

      return Promise.reject(new Error('两次输入密码不一致，请重新输入！'))
    },
  })

  const initialValues = {
    username: 'yang',
    email: 'yang@123.com',
    password: '123456',
    ret_password: '123456',
  }

  return (
    <Modal title="注册" className="app-register-dialog" forceRender open={isRegister} onOk={onFinish} width={450} footer={null} destroyOnClose onCancel={handleCancel} afterClose={afterClose}>
      <Form className="app-login-form" size="large" name="basic" layout="vertical" autoComplete="off" validateTrigger="onBlur" form={form} preserve={false} requiredMark={false} onFinish={onFinish} initialValues={initialValues}>
        <Form.Item name="username" rules={rules.username}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="email" rules={rules.email}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input.Password allowClear placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="ret_password" dependencies={['password']} rules={[validatePsw]}>
          <Input.Password allowClear placeholder="请确认密码" />
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

export default Register
