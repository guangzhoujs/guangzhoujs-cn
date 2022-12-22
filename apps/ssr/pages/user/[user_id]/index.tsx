import Head from 'next/head'
import UserLayout from '@/layouts/user'
import AppConfig from '@/config'
import { fetchArticleCategory, fetchArticleList } from '@/api/home'

type PostPageProps = {
  categories: any
  articles: any
}

const User = ({ categories, articles }: PostPageProps) => {
  const { title, description } = AppConfig

  console.log('categoryies', categories[0].id)
  console.log('articles', articles[0].id)

  return (
    <UserLayout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model app-article-model flex my-6">
        111
      </div>
    </UserLayout>
  )
}

export async function getServerSideProps() {
  const { rows: categories } = await fetchArticleCategory()
  const { rows: articles } = await fetchArticleList()
  categories[0]?.children.unshift({ id: '', title: '全部' })

  return { props: { categories, articles } }
}

export default User
