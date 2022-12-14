import { notification } from 'antd'
import { AppContext } from 'next/app'
import { StoreKey } from '@/config'

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentIdParams 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id?: string, parentIdParams?: string, children?: any) {
  const config = {
    id: id || 'id',
    parentId: parentIdParams || 'parent_id',
    childrenList: children || 'children',
  }

  const childrenListMap: any = {}
  const nodeIds: any = {}
  const tree: any = []

  if (!data) {
    return
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!childrenListMap[parentId]) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!nodeIds[parentId]) {
      d.label = d?.title || ''
      tree.push(d)
    }
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]]) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        c.label = c?.title || ''
        adaptToChildrenList(c)
      }
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  return tree
}

/**
 * Base64 编码
 * @param str
 * @returns {string|void}
 */
export function btoa(str: string) {
  return str ? window.btoa(unescape(encodeURIComponent(JSON.stringify(str)))) : console.warn('str不能为空')
}

/**
 * Base64 解码
 * @param str
 * @returns {string|void}
 */
export function atob(str: string) {
  return str ? decodeURIComponent(escape(window.atob(str))) : console.warn('str不能为空')
}

// 浏览器环境
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

// 移动设备
export const isMobile = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {}
  return /mobile|android|iphone|ipad|phone|webOS|BlackBerry/i.test((headers['user-agent'] || '').toLowerCase())
}

/**
 * 分享到
 * @param options
 * url: 项目访问地址
 * title: 项目名称
 * pics: 项目的封面图片地址
 * summary: 摘要
 * desc: 描述
 * appkey: 新浪微博分享appkey
 */
export const shareTo = (options: any) => {
  const { url, title, pics, type, summary, desc, appkey } = options

  // qq空间接口的传参
  if (type === 'qzone') {
    window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}?sharesource=qzone&title=${title}&pics=${pics}&summary=${summary}`)
  }
  // 新浪微博接口的传参
  if (type === 'weibo') {
    window.open(`http://service.weibo.com/share/share.php?url=${url}?sharesource=weibo&title=${title}&pic=${pics}&appkey=${appkey}`)
  }
  // qq好友接口的传参
  if (type === 'qq') {
    window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${url}?sharesource=qzone&title=${title}&pics=${pics}&summary=${summary}&desc=${desc}`)
  }
}

// 滚动到
export const scrollTo = (id: string, contentId: string) => {
  const el = document.querySelector(id) as HTMLElement
  const content = document.querySelector(contentId) as HTMLElement

  el && el.scrollIntoView({
    behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
    block: 'center', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
    inline: 'nearest', // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
  })
  content.focus()
}

// 用户信息
export const getUserInfo = () => {
  const user = localStorage.getItem(StoreKey)
  return user ? JSON.parse(user) : null
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'
interface INotice {
  type?: NotificationType
  message?: string
  description?: string
}

export const notice = ({ type = 'success', message, description = '' }: INotice) => {
  notification[type]({ message, description })
}
