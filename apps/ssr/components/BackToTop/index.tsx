import React, { useCallback, useEffect, useState } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'

const BackToTop = () => {
  const [state, setState] = useState(0)

  const listenScroll = useCallback(() => {
    if (window?.scrollY > 100 && window?.scrollY < 400) {
      state !== 1 && setState(1)
    } else if (window?.scrollY > 400) {
      state !== 2 && setState(2)
    } else {
      state && setState(0)
    }
  }, [state])

  useEffect(() => {
    window.addEventListener('scroll', listenScroll)
    return () => {
      window.removeEventListener('scroll', listenScroll)
    }
  }, [listenScroll, state])

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <> {!!state && <div id="backToTop" onClick={scrollToTop}><ArrowUpOutlined /></div>} </>
  )
}

export default BackToTop
