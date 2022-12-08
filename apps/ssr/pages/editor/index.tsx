import React, { useEffect, useRef, useState } from 'react'
import { Space, Button, message, Form, notification } from 'antd'
import Tinymce from '@/components/Tinymce'
import { IsBrowser } from '@/components/IsBrowser'
import { useRootStore } from '@/providers/RootStoreProvider'
import { useSetState } from 'ahooks'
import UserInfo from '@/layouts/common/UserInfo'
import { fetchArticleDetail, fetchArticleInsert, fetchArticleUpdate } from '@/api/home'
import { useRouter } from 'next/router'
import Bytemd from '@/components/Bytemd'
import { marked } from 'marked'
import { Method } from 'axios'
import Meta from './meta'

const Editor = () => {
  const { appStore: { isLogined, user, city } } = useRootStore()
  const [state, setState] = useSetState({ content: '', md: '', is_top: 0, status: 0, tags: [] })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm()
  const { validateFields } = form
  const { type, id: article_id } = router.query
  const isMD = type === 'md'
  const isEdit = !!article_id
  const contentRef = useRef<any>(null)

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

  // 富文本改变
  const onEditorChange = (value: string) => {
    form.setFieldsValue({ content: value })
    setState({ content: value })
  }

  // 处理成功
  const handleSuccess = (txt: string) => {
    notification.success({
      message: '友情提醒',
      description: txt,
    })

    setTimeout(() => {
      setOpen(false)
      router.push('/user/article')
    }, 200)
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

  const handleClose = (isSubmit: boolean) => {
    if (!isSubmit) {
      setOpen(false)
      return
    }

    validateFields().then(async (values: any) => {
      values.is_top = +values.is_top
      values.status = +values.status

      if (isEdit) {
        values.id = +article_id
      }

      const md = contentRef.current ? contentRef.current : state.md
      values.content = md ? marked(md, { sanitize: true }) : values.content
      values.md = md

      if (!state.content) {
        message.error('请输入内容')
        return
      }

      handleFinish(values)
    })
  }

  // MD改变
  const onMdEditorChange = (value: string) => {
    form.setFieldsValue({ md: value })
    setState({ md: value })
    contentRef.current = value
  }

  return (
    <div className="app-editor relative">
      <div className="app-editor-header app-header">
        <div className="app-header-navbar container white shadow-4 border-bottom pc-model">
          <div className="app-header-main flex justify-between">
            <div className="app-header-logo">
              <span>
                <a href="/">{city.shortname}前端交流</a>
              </span>
            </div>
            <div className="app-editor-helper flex">
              <div className="app-editor-action mr-9">
                <Space size={20}>
                  <Button>草稿箱</Button>
                  <Button type="primary" onClick={onOpen}>发布</Button>
                </Space>
              </div>
              <div className="app-header-user">
                <IsBrowser>
                  <UserInfo user={user} />
                </IsBrowser>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-tiny-wrap container pt-6">
        <IsBrowser>
          {!isMD ? <Tinymce content={state.content} onEditorChange={onEditorChange} /> : <Bytemd content={contentRef.current || state.md} onMdEditorChange={onMdEditorChange} />}
        </IsBrowser>
      </div>
      <Meta open={open} setOpen={setOpen} state={state} setState={setState} article_id={article_id} onClose={handleClose} form={form} />
    </div>
  )
}

export default Editor
