import { Button, Col, Menu, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import menuItems from './routes'

export default function SiderMenu() {
  const r = useRouter()
  // const openKey: Array<string> = []
  console.log('pathname', r.pathname)

  const handleMenuClick = ({ item }: any) => {
    // console.log('item', item)
    r.push(item.props.path)
  }

  return (
    <div className="app-sider-menu">
      <Row className="app-sider-write p-2" gutter={10}>
        <Col span="24">
          <Link href="/editor?type=md">
            <a target="_blank" rel="noreferrer">
              <Button>返回个人主页</Button>
            </a>
          </Link>
        </Col>
      </Row>
      <Menu items={menuItems} mode="inline" theme="light" selectedKeys={[r.pathname]} inlineIndent={15} onClick={handleMenuClick} className="app-menu-inner" />
    </div>
  )
}
