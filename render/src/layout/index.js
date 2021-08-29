import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Skeleton } from 'antd'
import { setup } from '@formily/antd-components'
import zhCN from 'antd/lib/locale/zh_CN'
import Routes from '@/routes'
import Container from './components/Container'
import './index.less'

// formily 注册表单
setup()

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Container>
        <Suspense fallback={<Skeleton />}>
          <Routes />
        </Suspense>
      </Container>
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)
