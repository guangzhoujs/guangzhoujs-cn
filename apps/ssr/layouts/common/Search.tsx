import { Search } from '@carbon/icons-react'
import { Form, Input, Button } from 'antd'
import Router, { useRouter } from 'next/router'

const HeaderSearch = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const { validateFields } = form
  const rules = {
    keywords: [
      { required: true, message: '请输入关键字' },
      { whitespace: true, message: '关键字不能为空' },
      { min: 1, max: 100, message: '长度在 1 到 100 个字符' },
    ],
  }

  // 处理搜索
  const handleFinish = (params: any) => {
    Router.push({ pathname: '/search', query: params })
  }

  // 搜索
  const onSearch = () => {
    validateFields().then(async (values: any) => {
      handleFinish(values)
    })
  }

  const initialValues = {
    keywords: router.query.keywords,
  }

  return (
    <Form className="app-search-form relative" size="large" name="basic" layout="vertical" autoComplete="off" validateTrigger="onBlur" form={form} preserve={false} requiredMark={false} onFinish={onSearch} initialValues={initialValues}>
      <div className="auto-suggest">
        <Form.Item name="keywords" rules={rules.keywords} noStyle label="关键字">
          <Input type="text" placeholder="请输入关键词搜索…" onPressEnter={() => onSearch()} className="search-input" />
        </Form.Item>
      </div>
      <Button className="btn search-to" type="primary" htmlType="submit">
        <Search />
      </Button>
    </Form>
  )
}

export default HeaderSearch
