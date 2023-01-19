import { EmptyStatus } from '@/config'
import { Blog } from '@carbon/icons-react'
import { Empty } from 'antd'
import Link from 'next/link'

type PostPageProps = {
  hots: any,
}

export function HotArticle({ hots }: PostPageProps) {
  if (!hots?.length) return EmptyStatus

  return (
    <div className="sider-items app-hot-article">
      <div className="sider-title">
        <h1><Blog />热门文章</h1>
      </div>
      <div className="sider-content">
        {hots?.length > 0 && hots.map((h: any) => {
          return (
            <Link href={`/article/${h.id}`} target="_blank" key={h.id} className="link" rel="noreferrer">
              <div className="text-body">{h.title}</div>
            </Link>
          )
        })}
        {!hots.length && <div style={{ paddingBottom: '10px' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
      </div>
    </div>
  )
}
