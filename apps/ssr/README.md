先来看一下整体的效果:

- 预览地址： [http://guangzhoujs.cn](http://guangzhoujs.cn)
- 仓库地址： [https://github.com/guangzhoujs/guangzhoujs-cn](https://github.com/guangzhoujs/guangzhoujs-cn)
  技术栈为：Nextjs13, Mobx, Antd, Ahooks, Bytemd, Tinymce-react, Tailwindcss等

### 1. guangzhoujs.cn 介绍
`guangzhoujs.cn` 定位服务于广州本地前端相关知识信息综合性交流平台，是基于当下流行的`Nextjs`, `Go`相关技术框架下的产物，在这个大前提下，技术融合和功能实现上更为灵活。`Nextjs`在使用`React`开发的基础上满足了`SEO`的需要，`Go`在保证响应速度的基础上占用最低的系统资源。
结果虽然很美丽，但过程很漫长，一个成功上线项目的背后是两个失败仓库的奠基，技术的选型有从最初的`nuxt3.rc1`开始，到中期更新到`rc10`之后就跑不起来的失败，也有被迫转向`Nextjs.12`的无耐。而`Nextjs`在开发快要完成的节骨眼上新版本13发布，又是一波骚操作，从`Nextjs12`强性升级到`Nextjs13`版本，[Next.js 13](https://secstep.com/next-js-13-published/) 虽然包含了 Turbopack，但目前还是`Alpha`阶段，最后衡量再三还是没有启用新的`Turopack`，还是奔着**需求做加法、开发做减法**的原则先上线再优化。那这个版本只是让`12`的代码在`13`的版本下正常运行起来，`Next13`的新特性用到的并不多。
![](https://s3.bmp.ovh/imgs/2022/12/25/05e2ae6f58889f01.png)

### 2. 技术介绍
#### 2.1 基本介绍
- [Nextjs](https://nextjs.org/)
  Nextjs的项目整体开发下来，除了上线遇到点坑之外，其它方面只要会`React Hooks`基础的文档看看都能开发。那刚发新版中文文档是没有的，然后我用这款翻译软件辅助：[腾讯交互翻译](https://transmart.qq.com/zh-CN/download)。[Nuxtjs中文站点入口](https://www.nextjs.cn/)。

- [Tailwindcss](https://tailwindcss.com/docs/guides/nextjs)
  本来我迷恋于`Unocss`的灵活，可惜在`Nextjs`中热更新老是失去响应，只能换回`Tailwindcss`，虽然`Unocss`也提供了一个`Nextjs`下的[案例](https://github.com/unocss/unocss/blob/main/examples/next/next.config.js)。

- [Antd](https://ant.design/index-cn)
  `Antd`选择的`4.x`版本，这个版本遇到的问题是分页组件在Next下跳转失效，所以就翻页又引入了另外一个UI组件库：[@nextui-org/react](https://nextui.org/)，只是这款组件视觉风格上我个人感觉较`Antd`略为粗犷，所以只使用了分页。

- Icon
  项目中的图标除了`@ant-design/icons`之外，本着图标风格上有更多的选择，所以引入了[@carbon/icons-react](https://carbondesignsystem.com/guidelines/icons/library/)，整体用下来基本满足基础的图标需要。

- 富文本编辑器
  针对不同用户的使用习惯分别提供了两款输入编辑器，一款供非专业人士使用，比如Hr。一款供专业人士使用，比如会Markdown语法的小伙伴，他们分别是：

  - [@tinymce/tinymce-react](https://www.tiny.cloud/)
    Tinymce新版需要申请`api-key`，需要说明的是只申请一个`api-key`，然后可使用在多域名场景下，只需要在`tiny`官网添加即可，登录之后在 [MY ACCOUNT / Approved Domains](https://www.tiny.cloud/my-account/domains/) 中添加，申请也是这个地址。
  - [@bytemd/react](https://github.com/bytedance/bytemd)
    bytemd是字节开发的一款富文本编辑器，可用于vue,react，主题可以使用[juejin-markdown-themes](juejin-markdown-themes)，虽然名叫juejin，其它里边有很多风格的css选择，具体在这个 `node_modules\juejin-markdown-themes\dist` 目录下。

- [qrcode.react](https://github.com/zpao/qrcode.react)
  其中一个页面需要分享展示用到二维码，用的这款，按照文档使用起来也没有大的问题。

- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
  按钮复制用这款，也没有什么大的问题。

- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)
  滚动加载用到了这款，出现的问题是出现滚动条，添加样式强制显示即可隐藏滚动条。
```javascript
<InfiniteScroll style={{ overflow: 'visible' }} >
```

#### 2.2 技术栈
技术 | 说明 | 官网
----|----|----
Nextjs | React应用开发框架 | [https://nextjs.org/](https://nextjs.org/)
Mobx | 全局状态管理模式 | [https://mobx.js.org/](https://mobx.js.org/)
Mobx-react-lite | mobx-react的轻量化版本 | [https://github.com/mobxjs/mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)
Axios | HTTP 库 | [https://github.com/axios/axios](https://github.com/axios/axios)
Ant-design | UI组件库 | [https://ant-design.gitee.io/](https://ant-design.gitee.io/)
Nextui | UI组件库 | [https://nextui.org/](https://nextui.org/)
Ahooks | React Hooks 库 | [https://ahooks.js.org/](https://ahooks.js.org/)
Bytemd | Markdown编辑器 | [https://github.com/bytedance/bytemd](https://github.com/bytedance/bytemd)
Tinymce | 富文本编辑器 | [https://www.tiny.cloud/](https://www.tiny.cloud/)
Dayjs | JavaScript 日期处理类库 | [https://day.js.org/zh-CN/](https://day.js.org/zh-CN/)
SCSS | CSS预处理器 | [https://sass-lang.com/](https://sass-lang.com/)
Carbon | 图标字体库  | [https://carbondesignsystem.com/guidelines/icons/library/](https://carbondesignsystem.com/guidelines/icons/library/)
Qrcode | 二维码 | [https://github.com/zpao/qrcode.react](https://github.com/zpao/qrcode.react)
React-copy-to-clipboard | 复制 | [https://github.com/nkbt/react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
React-infinite-scroll-component | 滚动加载 | [https://github.com/ankeetmaini/react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)
Tailwindcss | 原子CSS库 | [https://tailwindcss.com/docs/guides/nextjs](https://tailwindcss.com/docs/guides/nextjs)
Juejin-markdown-themes | 掘金 Markdown 主题 | [https://github.com/xitu/juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes)
Typescript | 类型约束 | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

#### 2.3 开发工具

系统 | 工具 | 官网
----|----|----
VScode | 主开发工具 | [https://code.visualstudio.com/](https://code.visualstudio.com/)
Webstorm | 辅开发工具 | [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/)
Atom | 源码阅读 | [https://atom.io/](https://atom.io/)
Cmder | Cmd替代工具[windows] | [https://cmder.net/](https://cmder.net/)
Notepad2 | 单文件编辑[windows] | [http://www.flos-freeware.ch/notepad2.html](http://www.flos-freeware.ch/notepad2.html)
Coteditor | 单文件编辑[mac] | [https://coteditor.com/](https://coteditor.com/)
Chrome | 调试工具 | [https://www.google.com/intl/zh-CN/chrome/](https://www.google.com/intl/zh-CN/chrome/)


#### 2.4 文件结构

```javascript
├─.next // 发布目录
│  ├─server
│  └─static
├─api // 请求文件
├─bc // 业务组件
├─components // 公共组件
├─config // 配置
├─context
├─hooks 
├─icons  // svg
├─layouts // 布局文件
├─pages // 页面
│  ├─article
│  ├─editor
│  ├─help
│  ├─hero
│  ├─job
│  └─user
├─providers
├─public // 静态资源
├─store
├─styles // 所有 Scss 文件
├─types
└─utils // 工具文件
```

#### 2.5 如何在本地运行
根目录下运行 `npm install`，然后运行 `npm dev`
```
// 切换环境
nvm install 17.0.0
nvm use 17.0.0

// 安装依赖
npm install

// 启动项目
npm start

// 清除 node_modules
npm run clean

// 全局安装 rimraf 之后方可使用
npm i rimraf -g

// 清除 node_modules 重新安装依赖
// 等同于 npm run clean && npm install
npm run reinstall

```

#### 2.6 如何发布上线
比较大的一坑，`Nextjs`的开发运行目录和打包上线目录都是`.next`，所以，打包输出结果要仔细看，要不然会把开发时运行的文件误上传。

##### 2.6.1 Nginx配置
先在nginx增加配置，转发`nextjs`的启动端口。
`Nextjs`虽然支持`basePath`进行二级目录的部署，可惜一刷新又出现`basePath`路径找不到的情况，只能根目录部署。

```javascript
location / {
  proxy_pass http://127.0.0.1:3600/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
}
```

##### 2.6.2 启动Nextjs
根目录新建`ecosystem.config.js`，然后用pm2启动这个文件就可以了。

```javascript
 module.exports = {
    apps: [{
        name: 'gzjs-ssr',
        script: 'npm',
        args: 'start',
        cwd: '/www/wwwroot/guangzhoujs.cn',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production',
            BASE_PATH: "",
            PORT: 3600
        }
    }]
}
```
然后根据域名访问，如果出现500，说明Next启动有问题，查看`Nginx`日志进行排错。

##### 2.6.3 发布问题

- Favicon 图片不能拷贝到发布目录
  就算安装`url-loader`也不能解决，解决办法，转换为Base64图片，后看文档也可以用`Image`，未试存疑中。
- 图片路径
  要不然，图片路径丢失
```javascript
import Image from 'next/image'
import Logo from '@/public/images/logo.png'
```
- [手工调整buildid](https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id)
  Nextjs前台静态资源会识别版本信息，最终影响生成目录路径在 `/.next/static`下，可以手工修改也可以是`Git commit id`。
```javascript
generateBuildId: async () => 'v3',
```
- image
  images中添加允许域名
```javascript
images: {
    domains: ['guangzhoujs.cn'],
},
```
- package.json
  需要上传`package.json`到根目录然后在服务端全量安装`node_modules`
- Nginx 缓存
  在其它机型上没有碰到这个问题，只有在腾讯云上碰到这个问题，代理转发有缓存，需要清目录后杀掉进程后启动nginx
```
$ cd /www/server/nginx/proxy_cache_dir // nginx缓存目录
$ pkill nginx // 强制关闭
$ /etc/init.d/nginx start // 启动
$ /etc/init.d/nginx stop
$ /etc/init.d/nginx restart
```


### 3. 开发介绍

#### 3.1 基本介绍

- 基础的工程采用`Pnpm Monorepo`的方式来搭建，在满足基础开发的需求上能够灵活扩展模块，并保持代码解耦。这方面其它大佬已经走在前面：

  - [Laffery - 基于pnpm搭建monorepo项目](https://juejin.cn/post/7084582387060834340)
  - [BestAns - pnpm + workspace + changesets 构建你的 monorepo 工程](https://juejin.cn/post/7098609682519949325)

- 由于整体是`React`的相关技术栈，计划帮助文档部分由[dumi](https://d.umijs.org/)来实现，可以快速的将[Markdown](https://markdown.com.cn/intro.html)转化为页面，入口地址由[Nginx](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)来安排。

#### 3.2 约定式路由
约定式路由式的开发，即 `pages`目录下所有文件夹层级为路由访问路径。比如 `pages/article/index.tsx`，那访问的路径就是`https://guangzhoujs.cn/article`。
`pages`中除了路由文件之外不建议放其它文件，要放其它扩展名文件还需要在`next.config.js`中增加[配置](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)。
```javascript
module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx']
}
```

#### 3.3 基础布局
基础的布局由`Layouts`负责，共有这几个：

- home
  负责基础页面的上中下式布局
- user
  负责用户中心左右式布局

#### 3.4 获取数据
`Nextjs` 共有两种渲染模式，这两个模式下有两种获取数据的方式

- 静态模式（默认），即在构建时生成 html，并每次请求时复用
  - `getStaticProps` 静态模式下使用，在构建时会调用该函数获取数据并返回到 props，会在构建时渲染生成 html
  - `getStaticProps` 中的 context 参数包含了常用的请求的 params，preview，previewData，locale 等参数
- 服务器端渲染模式，即每次请求时在服务器端重新生成 html。
  - `getServerSideProps` 服务器端渲染模式下使用，会在每次请求时先获取数据，接着重新生成 html 后再将页面返回到客户端。
  - `getServerSideProps` 中的 context 参数包含了常用的请求的 req、res、params、query 等参数

- axios
  页面上在`useEffect`中异步获取数据，这块的代码意思是在浏览器端运行了。

#### 3.5 SEO增强

通过 `next/head` 组件增加页面的`meta` 的 `keywords, description` 标签。

#### 3.6 更新到Next.js 13

- Title变化

Next.js 12
```html
<title>首页 - {title}</title>
```
Next.js 13
```html
`<title>{`首页 - ${title}`}</title>`
```
- Link的变化

Next.js 12
```html
<Link href=""><a target="_blank" rel="noreferrer">{title}</a></Link>
```
Next.js 13
```html
<Link href="" target="_blank" rel="noreferrer">{title}</Link>
```
[用这个命令全局替换](https://stackoverflow.com/questions/71422463/how-to-fix-unexpected-behavior-of-next-link-when-it-is-a-child-of-a-button)，然后全局校验`Eslint`
```
$ npx @next/codemod new-link .
```
- todo
- todo
- todo
- todo


如果还想找回此文，您可以点右上角 💖Star 💖 收藏 + 支持
