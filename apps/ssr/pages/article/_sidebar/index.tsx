import type { NextPage } from 'next'
import { HotTag } from '@/bc/HotTag'
import { HotArticle } from '@/bc/HotArticle'

const Sidebar: NextPage = () => {
  return (
    <div className="app-article-sidebar w-80 ml-6">
      <HotTag />
      <HotArticle />
    </div>
  )
}

export default Sidebar
