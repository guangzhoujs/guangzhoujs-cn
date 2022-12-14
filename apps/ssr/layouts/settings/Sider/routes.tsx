import { UserAddOutlined } from '@ant-design/icons'
import { Model } from '@carbon/icons-react'

const router: Array<any> = [
  {
    path: '/user/settings/profile',
    key: '/user/settings/profile',
    label: '个人资料',
    name: 'profile',
    icon: <Model />,
  },
  {
    path: '/user/settings/account',
    key: '/user/settings/account',
    label: '账号设置',
    name: 'job',
    icon: <UserAddOutlined />,
  },
]

export default router
