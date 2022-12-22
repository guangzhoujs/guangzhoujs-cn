import React, { useCallback, useEffect, useState } from 'react'
import { Space, Button, message, Form, notification, Drawer, Divider, Row, Col, Input, Collapse, Tooltip } from 'antd'
import { fetchUserArticleDetail, fetchUserArticleInsert, fetchUserArticleUpdate } from '@/api/home'
import CategorySelect from '@/components/CategorySelect'
import { SwapOutlined } from '@ant-design/icons'
import { Edit } from '@carbon/icons-react'
import TagsSelect from '@/components/TagsSelect'
import Tinymce from '@/components/Tinymce'
import { IsBrowser } from '@/components/IsBrowser'
import { useRootStore } from '@/providers/RootStoreProvider'
import { useSetState } from 'ahooks'
import UserInfo from '@/layouts/common/UserInfo'
import { useRouter } from 'next/router'
import Bytemd from '@/components/Bytemd'
import AppConfig, { CITY_CODE } from '@/config'
import { marked } from 'marked'
import { Method } from 'axios'
import Head from 'next/head'
import { getUserInfo } from '@/utils'
import classNames from 'classnames'

const { TextArea } = Input
const { Panel } = Collapse

type PageProps = {
  type: string,
}

const Editor = ({ type }: PageProps) => {
  const { title, description } = AppConfig
  const { appStore: { user } } = useRootStore()
  const [state, setState] = useSetState({ content: '', md: '', is_top: 2, status: 0, tags: [], tags_id: 0 })
  const [editorHtml, setEditorHtml] = useState<string>('')
  const [editorMd, seteditorMd] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [tipTitle, setTipTitle] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const router = useRouter()
  const [form] = Form.useForm()
  const { validateFields } = form
  const { id: article_id } = router.query
  const isMD = type === 'md'
  const isEdit = !!article_id

  const fetchDetail = async () => {
    const { rows } = await fetchUserArticleDetail({ id: article_id })

    rows.tags_id = rows.tags?.map((t: any) => t.id)
    isMD ? seteditorMd(rows.md) : setEditorHtml(rows.content)

    form.setFieldsValue(rows)
    setState(rows)
  }

  const onPageTitle = () => {
    setPageTitle(isMD ? 'Markdown 编辑器' : '富文本编辑器')
  }

  useEffect(() => {
    onPageTitle()

    if (!isEdit) return

    fetchDetail()
  }, [isEdit])

  // 处理成功
  const handleSuccess = (txt: string) => {
    notification.success({
      message: '友情提醒',
      description: txt,
    })

    setTimeout(() => {
      setOpen(false)
      isEdit ? router.push('/user/article') : window.location.reload()
    }, 1000)
  }

  // 新增
  function createData(params: any, txt: string) {
    fetchUserArticleInsert(params).then(() => {
      handleSuccess(txt)
    })
  }

  // 修改
  function updateData(params: any, txt: string) {
    fetchUserArticleUpdate(params).then(() => {
      handleSuccess(txt)
    })
  }

  // 提交接口
  const handleFinish = (params: any) => {
    let method: Method = 'post'
    let txt = '发布成功'

    if (isEdit) {
      method = 'patch'
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

  // 默认值
  const defaultValues = {
    is_top: 2, // 是否置顶
    statue: 1, // 状态
    city_code: CITY_CODE, // 城市编码
    author: getUserInfo()?.nick_name, // 作者
  }

  // 处理关闭抽屉菜单
  const handleClose = (isSubmit?: boolean) => {
    if (!isSubmit) {
      setOpen(false)
      return
    }

    validateFields().then(async (values: any) => {
      Object.assign(values, defaultValues)

      if (isEdit) {
        values.id = +article_id
      }

      const { md, content } = state
      values.content = md ? marked(md, { sanitize: true }) : content
      values.tags = state.tags

      if (!values.content) {
        message.error('请输入内容')
        return
      }

      handleFinish(values)
    })
  }

  // 富文本改变
  const onEditorChange = useCallback((value: string) => {
    setState({ content: value })
  }, [])

  // MD改变
  const onMdEditorChange = (value: string) => {
    setState({ md: value })
  }

  // 类别改变
  const onCategoryChange = (value: any) => {
    form.setFieldsValue({ category_id: value })
  }

  // 标签改变
  const onTagsChange = (value: any) => {
    let tags = []
    if (isEdit) {
      tags = value.map((t: any) => ({ article_id: +article_id, tag_name: t.label, tags_id: +t.value }))
    } else {
      tags = value.map((t: any) => ({ tag_name: t.label, tags_id: +t.value }))
    }

    setState({ tags })
  }

  const onSubmit = () => {
    handleClose(true)
  }
  const onCancel = () => {
    handleClose(false)
  }

  // 编辑器切换
  const onChangeditor = () => {
    const search = !isMD ? '?type=md' : ''
    setTipTitle(isMD ? '切换为富文本编辑器' : '切换为 Markdown 编辑器')
    onPageTitle()

    // router.push({ pathname: '/editor', search })
    window.open(`/editor/${search}`)
  }

  return (
    <>
      <Head>
        <title>{pageTitle} - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={classNames('app-editor relative overflow-hidden', { 'app-md-container': isMD, 'app-text-container': !isMD })}>
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
                      <Button type="link" onClick={onChangeditor}>
                        <Tooltip color="#fff" overlayClassName="app-change-editor" title={tipTitle}>
                          {isMD ? <SwapOutlined /> : <Edit className="app-editor-pen-icon" />}
                        </Tooltip>
                      </Button>
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
              {!isMD ? <Tinymce content={editorHtml} onEditorChange={onEditorChange} /> : <Bytemd content={editorMd} onMdEditorChange={onMdEditorChange} />}
            </IsBrowser>
          </div>

          <Drawer title="文章发布" width={450} className="app-editor-drawer" placement="right" closable onClose={() => handleClose()} open={open}>
            <Collapse defaultActiveKey={['1', '2', '3']} ghost className="app-editor-collapse" expandIconPosition="end">
              <Panel header="文章信息" key="2">
                <Form.Item
                  label="分类"
                  name="category_id"
                  rules={[{ required: true, message: '请选择分类' }]}
                >
                  <CategorySelect defaultValue={form.getFieldValue('category_id')} onChange={onCategoryChange} />
                </Form.Item>
                <Form.Item label="标签">
                  {isEdit ? <TagsSelect width="100%" defaultValue={state.tags_id} onChange={onTagsChange} />
                    : <TagsSelect width="100%" onChange={onTagsChange} />}
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

export async function getServerSideProps({ query }: any) {
  const { type = '' } = query

  return {
    props: {
      type,
    },
  }
}

export default Editor
