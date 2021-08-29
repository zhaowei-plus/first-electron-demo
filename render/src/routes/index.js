import React, { lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IRoute } from '@/assets/constant'
import config from './config'

const { routes = [] } = config

export default () => {
  const routesPath = []
  const collectRoutes = routes => {
    routes.forEach(route => {
      const { path, children = [] } = route
      if (children.length > 0) {
        collectRoutes(children)
      } else {
        routesPath.push(path)
      }
    })
  }
  collectRoutes(routes)
  return (
    <>
      {
        routesPath.map(path => (
          <Route
            key={path}
            path={path}
            component={
              lazy(
                () => import(`@/views${path}`),
              )
            }
          />
        ))
      }
      <Route
        exact
        path="/"
        render={() => <Redirect to={routesPath[0]} />} />
    </>
  )
}
