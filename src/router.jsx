import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet /> {/* This is where child routes (Login/Dashboard) render */}
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute])

export const router = createRouter({ routeTree })