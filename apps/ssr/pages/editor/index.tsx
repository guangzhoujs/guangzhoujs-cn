import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Space, Button, message, Form, notification, Drawer, Divider, Row, Col, Input, Checkbox, Collapse } from 'antd'
import CategorySelect from '@/components/CategorySelect'
import TagsSelect from '@/components/TagsSelect'
import Tinymce from '@/components/Tinymce'
import { IsBrowser } from '@/components/IsBrowser'
import { useRootStore } from '@/providers/RootStoreProvider'
import { useSetState } from 'ahooks'
import UserInfo from '@/layouts/common/UserInfo'
import { fetchArticleDetail, fetchArticleInsert, fetchArticleUpdate } from '@/api/home'
import { useRouter } from 'next/router'
import Bytemd from '@/components/Bytemd'
import AppConfig from '@/config'
import { marked } from 'marked'
import { Method } from 'axios'
import Head from 'next/head'
// import Meta from './meta'

const { TextArea } = Input
const { Panel } = Collapse

const Editor = () => {
  const { title, description } = AppConfig
  const { appStore: { isLogined, user } } = useRootStore()
  const [state, setState] = useSetState({ content: '', md: '', is_top: 0, status: 0, tags: [], tags_id: 0 })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm()
  const { validateFields } = form
  const { type, id: article_id } = router.query
  const isMD = type === 'md'
  const isEdit = !!article_id
  const contentRef = useRef<any>(null)
  const mdContentRef = useRef<any>(null)

  // 未登录
  useEffect(() => {
    if (!isLogined) {
      // router.push('/')
    }
  }, [isLogined])

  const fetchDetail = async () => {
    const { rows } = await fetchArticleDetail({ id: article_id })

    rows.tags_id = rows.tags?.map((t: any) => t.article_tags_id)
    delete rows.category

    form.setFieldsValue(rows)
    setState(rows)
  }

  useEffect(() => {
    if (!isEdit) return

    fetchDetail()
  }, [isEdit, open])

  // 处理成功
  const handleSuccess = (txt: string) => {
    notification.success({
      message: '友情提醒',
      description: txt,
    })

    setTimeout(() => {
      setOpen(false)
      // router.push('/user/article')
      window.location.reload()
    }, 1000)
  }

  // 新增
  function createData(params: any, txt: string) {
    fetchArticleInsert(params).then(() => {
      handleSuccess(txt)
    })
  }

  // 修改
  function updateData(params: any, txt: string) {
    fetchArticleUpdate(params).then(() => {
      handleSuccess(txt)
    })
  }

  const handleFinish = (params: any) => {
    let method: Method = 'post'
    let txt = '添加成功'

    if (isEdit) {
      method = 'put'
      txt = '修改成功'
    }

    if (!params.title) {
      message.error('请输入标题')
      return
    }

    const fParams = { type: method, params }
    !isEdit ? createData(fParams, txt) : updateData(fParams, txt)
  }

  const onOpen = () => {
    setOpen(true)
  }

  const handleClose = (isSubmit?: boolean) => {
    if (!isSubmit) {
      setOpen(false)
      return
    }

    validateFields().then(async (values: any) => {
      console.log('values', values)
      debugger

      values.is_top = +values.is_top
      values.status = +values.status

      if (isEdit) {
        values.id = +article_id
      }

      const md = mdContentRef.current ? mdContentRef.current : state.md
      values.content = md ? marked(md, { sanitize: true }) : contentRef.current
      values.md = md

      if (!values.content) {
        message.error('请输入内容')
        return
      }

      handleFinish(values)
    })
  }

  // 富文本改变
  const onEditorChange = useCallback((value: string) => {
    form.setFieldsValue({ content: value })
    setState({ content: value })
    contentRef.current = value
  }, [])

  // MD改变
  const onMdEditorChange = (value: string) => {
    form.setFieldsValue({ md: value })
    setState({ md: value })
    mdContentRef.current = value
  }

  const onCategoryChange = (value: any) => {
    form.setFieldsValue({ category_id: value })
  }

  const onTagsChange = (value: any) => {
    const tags = article_id && value.map((t: any) => ({ article_id: +article_id, tag_name: t.label, article_tags_id: +t.value }))
    setState({ tags })
  }

  const onSubmit = () => {
    handleClose(true)
  }
  const onCancel = () => {
    handleClose(false)
  }

  return (
    <>
      <Head>
        <title>发表 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-editor relative overflow-hidden">
        <Form
          className="app-editor-popup-form"
          name="basic"
          layout="vertical"
          form={form}
          autoComplete="off"
          preserve={false}
          requiredMark={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          <div className="app-editor-header app-header">
            <div className="app-header-navbar white shadow-4 border-bottom pc-model">
              <div className="app-editor-header-main pl-5">
                <Row gutter={10}>
                  <Col span={21}>
                    <Form.Item name="title" noStyle rules={[{ required: true, message: '请输入标题' }, { whitespace: true, message: '标题不能为空' }]}>
                      <Input placeholder="请输入标题" />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <div className="app-editor-user flex justify-start items-center">
                      <Button hidden>草稿箱</Button>
                      <Button type="primary" onClick={onOpen}>发布</Button>
                      <IsBrowser>
                        <UserInfo user={user} />
                      </IsBrowser>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="app-tiny-wrap">
            <IsBrowser>
              {!isMD ? <Tinymce content={contentRef.current || state.content} onEditorChange={onEditorChange} /> : <Bytemd content={mdContentRef.current || state.md} onMdEditorChange={onMdEditorChange} />}
            </IsBrowser>
          </div>
          {/* <Meta open={open} setOpen={setOpen} state={state} setState={setState} article_id={article_id} onClose={handleClose} form={form} /> */}

          <Drawer title="文章发布" width={450} className="app-editor-drawer" placement="right" closable onClose={() => handleClose()} open={open}>
            <Collapse defaultActiveKey={['1', '2', '3']} ghost className="app-editor-collapse" expandIconPosition="end">
              <Panel header="状态" key="1">
                <Row>
                  <Col span={8}>
                    <Form.Item name="is_top" noStyle>
                      <Checkbox value={1}>置顶</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="status" noStyle>
                      <Checkbox value={1}>草稿</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
              <Panel header="文章信息" key="2">
                <Form.Item
                  label="分类"
                  name="category_id"
                  rules={[{ required: true, message: '请选择分类' }]}
                >
                  <CategorySelect width="100%" defaultValue={form.getFieldValue('category_id')} onChange={onCategoryChange} />
                </Form.Item>
                <Form.Item label="标签">
                  <TagsSelect width="100%" defaultValue={state.tags_id} onChange={onTagsChange} />
                </Form.Item>
              </Panel>
              <Panel header="摘要" key="3">
                <Form.Item name="summary" rules={[{ required: true, message: '请输入摘要' }]} noStyle>
                  <TextArea placeholder="请输入摘要" autoComplete="off" autoSize={{ minRows: 2, maxRows: 6 }} showCount maxLength={200} />
                </Form.Item>
              </Panel>
            </Collapse>
            <div className="app-editor-popup px-4">
              <Divider />
              <div className="app-editor-popup-footer">
                <Space size={15}>
                  <Button onClick={onCancel}>取消</Button>
                  <Button type="primary" onClick={onSubmit}>提交</Button>
                </Space>
              </div>
            </div>
          </Drawer>
        </Form>
      </div>
    </>
  )
}

export default Editor
