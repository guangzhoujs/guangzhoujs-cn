import { TagColorList } from '@/config'
import { Category } from '@carbon/icons-react'
import { Space, Empty } from 'antd'

type PostPageProps = {
  tags: any,
}

export function HotTag({ tags }: PostPageProps) {
  return (
    <div className="sider-items app-tags-model">
      <div className="sider-title">
        <h1><Category />热门标签</h1>
      </div>
      <div className="sider-content">
        <Space wrap>
          {tags?.length > 0 && tags.map((t: any, index: number) => {
            const color = TagColorList[index % 15]
            return (
              <a target="_blank" key={t.id} style={{ background: color }} className="ml-1 badge-tag text-white" rel="noreferrer">{t.tag_name}</a>
            )
          })}
        </Space>
        {!tags.length && <div style={{ marginTop: '-10px' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
      </div>
    </div>
  )
}
