import { AdminUsersTable } from '@/features/admin/components/admin-users-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_admin/admin/users-list')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <div>
      <AdminUsersTable />
    </div>
  )
}
