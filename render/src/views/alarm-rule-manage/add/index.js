import React from 'react'
import { BreadCrumb, Layout } from '@/components'

const { Content } = Layout

const Add = () => (
  <Layout>
    <BreadCrumb
      routes={[{ title: '告警规则管理', to: '/alarm-rule-manage' }, '新建告警']}
    />
    <Content>
      新增告警规则
    </Content>
  </Layout>
)

export default Add
