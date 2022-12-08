import { Blog } from '@carbon/icons-react'

export function HotArticle() {
  return (
    <div className="sider-items app-hot-article">
      <div className="sider-title">
        <h1><Blog />热门文章</h1>
      </div>
      <div className="sider-content">
        <a href="#" target="_blank" className="link">
          <div className="text-body">微信小程序转为App并上架应用市场</div>
        </a>
        <a href="#" target="_blank" className="link">
          <div className="text-body">CSS美化一个Bootstrap4下拉菜单（dropdown）</div>
        </a>
        <a href="#" target="_blank" className="link">
          <div className="text-body">Java 并发编程解析 | 基于JDK源码解析Java领域中的并发锁，我们可以从中学习到什么内容？</div>
        </a>
        <a href="#" target="_blank" className="link">
          <div className="text-body">微信小程序转为App并上架应用市场</div>
        </a>
        <a href="#" target="_blank" className="link">
          <div className="text-body">CSS美化一个Bootstrap4下拉菜单（dropdown）</div>
        </a>
        <a href="#" target="_blank" className="link">
          <div className="text-body">Java 并发编程解析 | 基于JDK源码解析Java领域中的并发锁，我们可以从中学习到什么内容？</div>
        </a>
      </div>
    </div>
  )
}
