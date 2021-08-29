import React, { useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import config from '@/routes/config'
import './index.less'

const { Sider } = Layout
const { Item, SubMenu } = Menu
const { title, routes = [] } = config

export default () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const handleMenuClick = ({ key }) => {
    history.push(key)
  }

  const renderMenus = (routes) =>
    routes.map(({ title, path, children = [], show = true }) => {
      if (!show) {
        return null
      }
      if (Array.isArray(children) && children.length > 0) {
        return (
          <SubMenu key={path} title={title}>
            {renderMenus(children)}
          </SubMenu>
        )
      }
      return <Item key={path}>{title}</Item>
    }).filter(Boolean)

  const paths = useMemo(
    () =>
      pathname
        .split('/')
        .filter(Boolean)
        .map(
          (item, index, arr) =>
            `/${arr.slice(0, index + 1).join('/')}`,
        ),
    [pathname],
  )

  const defaultOpenKeys = routes
    .filter(({ children = [] }) => children.length > 0)
    .map(item => item.path)

  return (
    <div className="xm-sider">
      <div className="xm-sider__title">{title}</div>
      <Sider
        width={180}
        className="xm-sider__content"
      >
        <Menu
          mode="inline"
          selectedKeys={paths}
          onClick={handleMenuClick}
          defaultOpenKeys={defaultOpenKeys}
        >
          {renderMenus(routes)}
        </Menu>
      </Sider>
    </div>
  )
}
