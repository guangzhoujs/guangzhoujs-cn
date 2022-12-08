import { useContext } from 'react'
import { fetchCommentInsert } from '@/api/home'
import { CommentContext } from '@/pages/_common/comment-context'
import { useDebounceFn } from 'ahooks'
import { Input, Button, Form, message } from 'antd'
import { Method } from 'axios'

const { TextArea } = Input

const CommentInput = ({ parentId }: any) => {
  const { commentData } = useContext(CommentContext)
  const [form] = Form.useForm()
  const { validateFields } = form
  const { articleId } = commentData

  const resfresh = () => {
    console.log('refresh')
  }

  const onSave = (params: any) => {
    const method: Method = 'post'
    const txt = '评论成功'

    const fParams = { type: method, params }
    fetchCommentInsert(fParams).then(() => {
      message.success(txt)

      setTimeout(() => {
        form.resetFields()
        resfresh()
      }, 500)
    })
  }

  const onSubmit = () => {
    validateFields().then(async (values: any) => {
      Object.assign(values, { status: 1, article_id: +articleId, parent_id: +parentId })
      onSave(values)
    })
  }

  // 防抖，500ms内最响应最后一次
  const { run: handleSubmit } = useDebounceFn(() => { onSubmit() }, { wait: 500 })

  return (
    <>
      <Form
        form={form}
        component={false}
      >
        <Form.Item name="parent_id" noStyle>
          <Input hidden value={0} />
        </Form.Item>
        <div className="comment-main mb-3">
          <Form.Item name="content" rules={[{ required: true, message: '请输入评论' }]}>
            <TextArea placeholder="请输入评论" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </div>
        <div className="comment-action flex justify-between">
          <div />
          <Button type="primary" onClick={() => { handleSubmit() }}>发表</Button>
        </div>
      </Form>
    </>
  )
}

export default CommentInput
