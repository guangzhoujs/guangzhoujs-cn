import { useEffect } from 'react'
import Router from 'next/router'

const Hero = () => {
  useEffect(() => {
    const { pathname } = Router
    if (pathname === '/article') {
      Router.push('/article/all')
    }
  })

  return (
    <p />
  )
}

export default Hero
