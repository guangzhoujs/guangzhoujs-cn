import { HotTag } from '@/bc/HotTag'
import { HotArticle } from '@/bc/HotArticle'

type PostPageProps = {
  hots: any
  tags: any
}

const Sidebar = ({ hots, tags }: PostPageProps) => {
  return (
    <div className="app-article-sidebar w-80 ml-6">
      <HotTag tags={tags} />
      <HotArticle hots={hots} />
    </div>
  )
}

export default Sidebar
