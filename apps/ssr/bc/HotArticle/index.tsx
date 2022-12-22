import { Blog } from '@carbon/icons-react'
import { Empty } from 'antd'

type PostPageProps = {
  hots: any,
}

export function HotArticle({ hots }: PostPageProps) {
  return (
    <div className="sider-items app-hot-article">
      <div className="sider-title">
        <h1><Blog />热门文章</h1>
      </div>
      <div className="sider-content">
        {hots?.length > 0 && hots.map((h: any) => {
          return (
            <a href={`/article/${h.id}`} target="_blank" key={h.id} className="link" rel="noreferrer">
              <div className="text-body">{h.title}</div>
            </a>
          )
        })}
        {!hots.length && <div style={{ paddingBottom: '10px' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
      </div>
    </div>
  )
}
