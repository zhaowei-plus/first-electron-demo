import React from 'react'
import { Spin } from 'antd'
import cs from 'classnames'
import './index.less'

const Layout = props => {
  const { loading = false, children } = props
  return (
    <Spin
      spinning={loading}
      wrapperClassName="xm-layout">
      {children}
    </Spin>
  )
}

const Header = props => {
  const { wrapperClassName = '', ...rest } = props
  return (
    <div
      {...rest}
      className={`xm-layout__header ${wrapperClassName}`} />
  )
}

const Content = props => {
  const {
    children,
    wrapperClassName = '',
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={`xm-layout__content ${wrapperClassName}`}
    >
      {children}
    </div>
  )
}

const Footer = props => {
  const {
    hidden,
    children,
    wrapperClassName = '',
    ...rest
  } = props
  return (
    <div
      {...rest}
      className={cs(`xm-layout__footer ${wrapperClassName}`, { hidden })}
    >
      {children}
    </div>
  )
}

Layout.Header = Header
Layout.Content = Content
Layout.Footer = Footer

export default Layout
