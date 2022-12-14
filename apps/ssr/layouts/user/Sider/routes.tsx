import { UserAddOutlined } from '@ant-design/icons'
import { UserProfile, UserSettings, Model } from '@carbon/icons-react'

const router: Array<any> = [
  // {
  //   path: '/user/dashboard',
  //   key: '/user/dashboard',
  //   label: '工作台',
  //   name: 'dashboard',
  //   icon: <DashboardOutlined />,
  // },
  {
    path: '/user/article',
    key: '/user/article',
    label: '我的文章',
    name: 'article',
    icon: <Model />,
  },
  {
    path: '/user/job',
    key: '/user/job',
    label: '我的招聘',
    name: 'job',
    icon: <UserAddOutlined />,
  },
  {
    path: '/user/profile',
    key: '/user/profile',
    label: '个人资料',
    name: 'profile',
    icon: <UserProfile />,
  },
  {
    path: '/user/account',
    key: '/user/account',
    label: '账号设置',
    name: 'account',
    icon: <UserSettings />,
  },
  // {
  //   label: '帮助中心',
  //   icon: <Help />,
  //   children: [
  //     {
  //       label: '常见问题',
  //       key: '/user/help/qa',
  //       path: '/user/help/qa',
  //       name: 'qa',
  //       icon: <FileOutlined />,
  //     },
  //   ],
  // },
]

export default router
