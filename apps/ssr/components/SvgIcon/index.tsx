import React from 'react'
import cs from 'classnames'

// eslint-disable-next-line no-undef
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try { importAll(require.context('../../icons', true, /\.svg$/)) } catch (error) { console.log(error) }

type Props = {
  name?: string
} & React.SVGAttributes<SVGElement>

const SvgIcon = (props: Props) => {
  const { name, children, className, ...rest } = props

  return (
    <svg className={cs('icon', className)} {...rest}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

export default SvgIcon
