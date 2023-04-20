import React, { FC, useState } from 'react'
import { Form, Modal, Input, Row, Button, message } from 'antd'
import { UserOutlined, UnlockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useRootStore } from '@/providers/RootStoreProvider'
import ForgotPassword from './ForgotPassword'
import { fetchUserLogin } from '@/api/home'
import { setToken } from '@/utils/auth'
import { isBrowser } from '@/utils'
import { Domain, MasterDomain, MasterTokenKey, StoreKey } from '@/config'
import { Method } from 'axios'
import qs from 'qs'

interface Iprops {
  isLogin: boolean
  setIsLogin: any
  setIsRegister: any
}

const iconRC = (visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)

const Login: FC<Iprops> = ({ isLogin, setIsLogin, setIsRegister }) => {
  const [loading, setLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const { appStore } = useRootStore()
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

  const toLogin = () => {
    // const url = isDev() ? 'http://localhost:3007' : `http://${MasterDomain}`
    // const url = process.env.NEXT_PUBLIC_Master_Domain
    window.location.href = `http://${MasterDomain}/user/article?fromcity=${Domain}`
  }

  const cacheUserInfo = (token: string, userInfo: any) => {
    setToken(token, MasterTokenKey)
    setToken(token, MasterTokenKey, { domain: `.${MasterDomain}`, path: '/' })
    localStorage.setItem(StoreKey, JSON.stringify(userInfo))
    localStorage.setItem(MasterTokenKey, JSON.stringify(userInfo))

    appStore.hydrate({ user: userInfo, isLogined: true })
  }

  const handleFinish = (params: any) => {
    const method: Method = 'post'
    const txt = '登录成功'
    setLoading(true)

    const fParams = { type: method, params }
    fetchUserLogin(fParams).then((res: any) => {
      const { token, user: userInfo } = res
      message.success(txt)

      if (!token || !userInfo) {
        message.success('用户信息返回出错')
        return
      }

      if (isBrowser() && token && userInfo) {
        cacheUserInfo(token, userInfo)
        toLogin()
      }

      setTimeout(() => {
        setIsLogin(false)
        form.resetFields()
      }, 500)
    }).catch((err) => {
      console.warn(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const onFinish = () => {
    validateFields().then(async (values: any) => {
      handleFinish(qs.stringify(values))
    })
  }

  const handleCancel = () => {
    setIsLogin(false)
    setLoading(false)
  }

  // 注册
  const toRegister = () => {
    setIsLogin(false)
    setIsRegister(true)
  }

  // 找回密码
  const toFind = () => {
    // setIsLogin(false)
    // setIsForgotPassword(true)
    message.warn('请联系管理员')
  }

  const initialValues = {}
  // const initialValues = { username: 'admin', password: '123456' }

  return (
    <Modal title="登录" className="app-auth-dialog" forceRender open={isLogin} onOk={onFinish} width={450} footer={null} destroyOnClose onCancel={handleCancel} afterClose={afterClose}>
      <Form className="app-login-form" name="basic" layout="vertical" form={form} preserve={false} requiredMark={false} onFinish={onFinish} initialValues={initialValues}>
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
          <Button type="link" onClick={toRegister}>注册</Button>
          <Button type="link" onClick={toFind}>找回密码</Button>
        </Row>
      </Form>
      <ForgotPassword isForgotPassword={isForgotPassword} setIsForgotPassword={setIsForgotPassword} setIsLogin={setIsLogin} />
    </Modal>
  )
}

export default Login
