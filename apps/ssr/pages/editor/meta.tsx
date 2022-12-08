import CategorySelect from '@/components/CategorySelect'
import TagsSelect from '@/components/TagsSelect'
import { Drawer, Form, Input, Divider, Space, Button, Row, Col, Checkbox } from 'antd'

const { TextArea } = Input

const Meta = (props: any) => {
  const { open, onClose, form, setOpen, article_id, state, setState } = props

  const onCategoryChange = (value: any) => {
    form.setFieldValue({ category_id: value })
  }

  const onTagsChange = (value: any) => {
    const tags = value.map((t: any) => ({ article_id: +article_id, tag_name: t.label, article_tags_id: +t.value }))
    setState({ tags })
  }

  const onSubmit = () => {
    onClose(true)
  }
  const onCancel = () => {
    onClose(false)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer title="文章发布" width={450} placement="right" closable destroyOnClose onClose={handleClose} open={open}>
      <div className="app-editor-popup pt-5 pr-3">
        <Form
          className="app-editor-popup-form"
          name="basic"
          layout="vertical"
          form={form}
          preserve={false}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }, { whitespace: true, message: '标题不能为空' }]}
          >
            <TextArea placeholder="请输入标题" autoComplete="off" autoSize={{ minRows: 1, maxRows: 6 }} showCount maxLength={150} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="is_top" valuePropName="checked">
                <Checkbox value={1}>置顶</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" valuePropName="checked">
                <Checkbox value={1}>草稿</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="分类"
            name="category_id"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <CategorySelect width="100%" defaultValue={form.getFieldValue('category_id')} onChange={onCategoryChange} />
          </Form.Item>
          <Form.Item
            label="标签"
          // rules={[{ required: true, message: '请选择标签' }]}
          >
            <TagsSelect width="100%" defaultValue={state.tags_id} onChange={onTagsChange} />
          </Form.Item>
          <Form.Item
            label="摘要"
            name="summary"
            rules={[{ required: true, message: '请输入摘要' }]}
          >
            <TextArea placeholder="请输入摘要" autoComplete="off" autoSize={{ minRows: 1, maxRows: 6 }} showCount maxLength={200} />
          </Form.Item>
        </Form>
        <Divider />
        <div className="app-editor-popup-footer flex justify-end">
          <Space size={10}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={onSubmit}>确认</Button>
          </Space>
        </div>
      </div>
    </Drawer>
  )
}

export default Meta
