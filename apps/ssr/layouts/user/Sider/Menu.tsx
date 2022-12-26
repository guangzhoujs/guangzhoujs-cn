import { Button, Col, Menu, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import menuItems from './routes'

export default function SiderMenu() {
  const r = useRouter()

  const handleMenuClick = ({ item }: any) => {
    r.push(item.props.path)
  }

  return (
    <div className="app-sider-menu">
      <Row className="app-sider-write p-2" gutter={10}>
        <Col span="12">
          <Link href="/editor?type=md" target="_blank" rel="noreferrer">

            <Button type="primary">写文章</Button>

          </Link>
        </Col>
        <Col span="12">
          <Link href="/editor" target="_blank" rel="noreferrer">

            <Button>发招聘</Button>

          </Link>
        </Col>
      </Row>
      <Menu items={menuItems} mode="inline" theme="light" selectedKeys={[r.pathname]} inlineIndent={15} onClick={handleMenuClick} className="app-menu-inner" />
    </div>
  )
}
