import React from 'react'
import { Layout } from 'antd'
import Sider from '../sider'
import './index.less'

const { Content } = Layout

export default props => {
  const { children } = props
  return (
    <Layout className="xm-container">
      <Sider />
      <Content className="xm-container__content">{children}</Content>
    </Layout>
  )
}
