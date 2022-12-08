import { useState } from 'react'
import Image from 'next/image'
import { Button } from 'antd'
import { MessageOutlined, LikeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import CommentInput from './comment-input'
import classNames from 'classnames'
import { useToggle } from 'ahooks'

type PostPageProps = {
  PropData: any,
}

const CommentItem = ({ PropData }: PostPageProps) => {
  const src = 'https://pica.zhimg.com/691df473a_is.jpg?source=32738c0c'
  const r = PropData
  const [isReply, { toggle }] = useToggle()
  const [parentId, setParentId] = useState(0)

  const onReply = () => {
    toggle()
    setParentId(r.id)
  }

  return (
    <div className="comment-list flex mb-3">
      <Link href="">
        <a className="user-link mr-2">
          <Image
            loader={() => src}
            src={src}
            alt="Picture of the author"
            className="rounded-full"
            width={38}
            height={38}
          />
        </a>
      </Link>
      <div className="comment-box flex-1">
        <div className="commnet-main mb-3">
          <div className="user-box flex justify-between">
            <div className="user">{r.username}</div>
            <time className="time">{r.create_time}</time>
          </div>
          <div className="content py-3">{r.content}</div>
          <div className="action-box flex justify-end">
            <div className="action-like">
              <Button type="link" icon={<LikeOutlined />}>点赞</Button>
            </div>
            <div className={classNames('action-reply', { active: isReply })}>
              <Button type="link" onClick={onReply} icon={<MessageOutlined />}>{isReply ? '取消回复' : '回复'}</Button>
            </div>
          </div>
        </div>
        {isReply && <div className="comment-reply-wrap mb-3"><CommentInput parentId={parentId} /></div>}
        <div className="sub-comment-wrap">
          {r.children?.length > 0 && r.children.map((c: any) => {
            return (
              <CommentItem key={c.id} PropData={c} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
