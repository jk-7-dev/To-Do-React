import { createRootRoute, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
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
  beforeLoad: ({ location }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute])

export const router = createRouter({ routeTree })