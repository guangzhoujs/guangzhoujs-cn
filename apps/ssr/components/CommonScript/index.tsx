import { baiduGA } from '@/config'

/**
 * 第三方代码 统计脚本
 * @returns {JSX.Element}
 * @constructor
 */
const CommonScript = () => {
  // eslint-disable-next-line @next/next/no-sync-scripts
  return <script src={baiduGA} />
}

export default CommonScript
