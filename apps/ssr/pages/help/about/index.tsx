import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig from '@/config'
import Logo from '@/public/images/logo.png'
import Image from 'next/image'
import { Divider } from 'antd'
import Link from 'next/link'

const About = () => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model container mx-auto my-6 p-6 app-page-bg">
        <div className="app-about-title text-xl mb-4 text-center">
          <h1>关于我们</h1>
        </div>
        <Divider />
        <div className="app-about-body flex content-center justify-center">
          <div className="img mr-5">
            <Image alt="Vercel logo" src={Logo} width={200} height={150} />
          </div>
          <div className="main">
            <div className="app-main-title text-xl mb-4">
              <h1>Hi，我们是身在广州的一群从事前端的小伙伴。</h1>
            </div>
            <div className="app-about-content text-base">
              <p>我们有着同一个信仰，同一个信念，同一个信心。</p>
              <p>生活中有泪水，工作中有汗水，学习中有苦水，</p>
              <p>但我们仍然坚信科技改变世界，代码改变生活，双手改变未来。</p>
              <p>加油，我们一直在路上。</p>
              <p>
                <Link href="https://github.com/guangzhoujs/" target="_blank" rel="noreferrer">
                  https://github.com/guangzhoujs/
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
