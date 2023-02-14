import config from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import Img from '@/public/images/logo.png'

export default function Logo() {
  return (
    <Link className="app-log-link" href="/" title={config.title}>
      <Image unoptimized src={Img} alt={config.title} className="mr-3" width={38} height={38} />
      <span className="app-header-title">{config.title}</span>
    </Link>
  )
}
