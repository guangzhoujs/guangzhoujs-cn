import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next/link'

type PostPageProps = {
  categories: any,
}

const Nav = ({ categories }: PostPageProps) => {
  const { query: { category_id } } = useRouter()

  return (
    <div className="app-article-nav w-32 mr-6">
      <nav className="article-nav-list">
        {categories.length > 0 && categories.map((r: any) => {
          const catId = !r.id ? 0 : r.id
          const activeCls = catId === parseInt(category_id as string, 10) ? 'active' : ''
          const url = `/article/category/${catId}`

          return (
            <h2 key={r.id} className={classNames(activeCls)}>
              <Link href={url}>
                <a className="link">{r.title}</a>
              </Link>
            </h2>
          )
        })}
      </nav>
    </div>
  )
}

export default Nav
