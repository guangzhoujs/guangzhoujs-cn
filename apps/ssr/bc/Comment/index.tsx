import Image from 'next/image'
import { Card, Empty } from 'antd'
import CommentItem from './comment-item'
import CommentInput from './comment-input'
import { memo } from 'react'

type PostPageProps = {
  PropData: any,
}

const Comment = ({ PropData }: PostPageProps) => {
  const src = 'https://pica.zhimg.com/691df473a_is.jpg?source=32738c0c'

  return (
    <Card title="评论区">
      <div className="comment-card flex mb-3">
        <div className="comment-avatar mr-2">
          <Image loader={() => src} src={src} alt="Picture of the author" className="rounded-full" width={38} height={38} />
        </div>
        <div className="comment-body flex-1">
          <CommentInput />
        </div>
      </div>
      <div className="have-comment">
        {PropData.length > 0 && PropData.map((r: any) => {
          return (
            <CommentItem key={r.id} PropData={r} />
          )
        })}
        {!PropData?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </Card>)
}

export default memo(Comment)
