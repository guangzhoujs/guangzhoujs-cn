import { useState } from 'react'
import { ThumbsUpFilled, Chat, Share } from '@carbon/icons-react'
import { message, Popover } from 'antd'
import { scrollTo } from '@/utils'
import { fetchArticleLikes } from '@/api/home'
import { StoreKey } from '@/config'
import classNames from 'classnames'
import { Method } from 'axios'
import Society from './society'

const ArticleSharing = ({ PropData }: any) => {
  const idsKey = `${StoreKey}.article.likes.ids`
  const { id: articleId, likes, comment_count } = PropData
  const [likedIds, setLikedIds] = useState([''])
  const [liked, setLiked] = useState(false)

  const isLiked = (id: string) => {
    return likedIds.includes(id)
  }

  // 处理成功
  const handleOk = (data: any) => {
    setLiked(data)
    setLikedIds([...likedIds, articleId])

    localStorage.setItem(idsKey, JSON.stringify([...likedIds, articleId]))
  }

  const handleLike = () => {
    const method: Method = 'post'
    const params = { type: method, id: `${articleId}`, params: { likes: likes + 1 } }

    fetchArticleLikes(params).then((res) => {
      handleOk(res?.data)
    })
  }

  // 点赞
  const onLikes = () => {
    if (isLiked(articleId)) {
      message.error('感谢支持，您已赞过~！')
      return
    }

    handleLike()
  }

  // 评论
  const onComment = () => {
    scrollTo('#app-comment', '#content')
  }

  return (
    <div className="app-blog-action">
      <div className={classNames('action-btn with-badge', { ok: liked })} data-badge={likes} onClick={() => onLikes()}>
        <ThumbsUpFilled className="animated" />
      </div>
      <div className="action-btn with-badge" hidden data-badge={comment_count} onClick={() => onComment()}>
        <Chat className="animated" />
      </div>
      <div className="app-article-popup">
        <Popover content={<Society />} placement="rightTop">
          <div className="action-btn js-share-action" data-type>
            <Share className="animated" />
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default ArticleSharing
