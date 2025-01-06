import { Toaster } from '@/components/ui/sonner'
import QueryProvider from '@/providers/query-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
//import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <QueryProvider>
      <div className="bg-slate-50 h-screen">
        <Outlet />
        <Toaster />
      </div>
    </QueryProvider>
  ),
})