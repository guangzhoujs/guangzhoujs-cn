import React, { FC, useState } from 'react'
import { Form, Modal, Input, Row, Button, message } from 'antd'
import { UserOutlined, UnlockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
// import { useGlobalContext } from '@/context/useGlobalContext'
import { fetchUserLogin } from '@/api/home'
// import { useRouter } from 'next/router'
import { Method } from 'axios'
import qs from 'qs'
import { isBrowser } from '@/utils'
import { useAuth } from '@/context/auth-provider'
import { useRootStore } from '@/providers/RootStoreProvider'

interface Iprops {
  isLogin: boolean
  setIsLogin: any
}

const iconRC = (visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)

const Login: FC<Iprops> = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false)
  const { appStore } = useRootStore()
  const state = useAuth()
  console.log('state', state)
  // const router = useRouter()
  const [form] = Form.useForm()
  const { validateFields } = form
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    vercode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
  }

  const afterClose = () => {
    form.resetFields()
  }

  const handleFinish = (params: any) => {
    const method: Method = 'post'
    const txt = '登录成功'

    const fParams = { type: method, params }
    fetchUserLogin(fParams).then((res: any) => {
      const { token, user: userInfo } = res
      console.log('res', res)
      message.success(txt)

      if (isBrowser()) {
        localStorage.setItem('f2e.token', token)
        localStorage.setItem('f2e.user', JSON.stringify(userInfo))
        appStore.hydrate({ user: userInfo, isLogined: true })
      }

      // console.log(user)

      // setTimeout(() => {
      // router.push('/login')
      // })

      setTimeout(() => {
        setIsLogin(false)
        form.resetFields()
      }, 500)
    })
  }

  const onFinish = () => {
    validateFields().then(async (values: any) => {
      // Object.assign(values, { rsa_id: id, password, area_code, school_code })
      console.log('values', values)
      handleFinish(qs.stringify(values))
    })
  }

  const handleCancel = () => {
    setIsLogin(false)
    setLoading(false)
  }

  return (
    <Modal title="注册登录" className="app-auth-dialog" forceRender open={isLogin} onOk={onFinish} width={450} footer={null} destroyOnClose onCancel={handleCancel} afterClose={afterClose}>
      <Form className="app-login-form" name="basic" layout="vertical" form={form} preserve={false} requiredMark={false} onFinish={onFinish} initialValues={{ username: 'admin', password: 'admin' }}>
        <Form.Item name="username" rules={rules.username}>
          <Input size="large" autoComplete="off" prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input.Password autoComplete="off" size="large" prefix={<UnlockOutlined />} placeholder="请输入密码" iconRender={iconRC} />
        </Form.Item>
        <Row className="mb-5">
          <Button block size="large" type="primary" htmlType="submit" loading={loading}> 登录 </Button>
        </Row>
        <Row className="auth-action justify-between">
          <Button type="link">注册</Button>
          <Button type="link">找回密码</Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default Login
