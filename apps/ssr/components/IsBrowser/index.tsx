import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type IsBrowserProps = {
  children: ReactNode
  slot?: ReactNode
}

export const IsBrowser = ({ children, slot }: IsBrowserProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return slot ? <>{slot}</> : <></>
  }

  return <>{children}</>
}
