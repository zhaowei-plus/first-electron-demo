import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

export default props => {
  const {
    routes = [], // 路由配置数组，结构如下：
    /**
     * [
     *  '路由标题',
     *  {
     *     title: '路由标题',
     *     to: '跳转路由',
     *  }, {
     *     title: '当前路由',
     *     onClick: () => {} // 点击处理
     *  }
     * ]
     * * */
    extra,
  } = props
  const history = useHistory()

  const handleClick = route => {
    const { to, onClick } = route
    if (to) {
      history.push(to)
    } else if (typeof onClick === 'function') {
      onClick()
    }
  }

  return (
    <div className="bread-crumb">
      <div className="bread-crumb__routes">
        {
          routes.map((route, index, array) => {
            const isString = typeof route === 'string'
            const title = isString ? route : route.title
            if (index === array.length - 1 || isString) {
              return (
                <div
                  key={index}
                  className="route">
                  <span>{title}</span>
                </div>
              )
            }
            return (
              <div
                key={index}
                className="route">
                <a onClick={() => handleClick(route)}>{title}</a>
              </div>
            )
          })
        }
      </div>
      {
        !!extra && (
          <div className="bread-crumb__extra">
            {extra}
          </div>
        )
      }
    </div>
  )
}
