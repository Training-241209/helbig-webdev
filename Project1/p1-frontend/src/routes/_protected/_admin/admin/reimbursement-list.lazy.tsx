import { AdminReimbursementsTable } from '@/features/admin/components/admin-reimbursements-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/_admin/admin/reimbursement-list',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AdminReimbursementsTable />
    </div>
  )
}
