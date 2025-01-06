import { AdminResolvedReimbursementsTable } from '@/features/admin/components/admin-resolved-reimbursements-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/_admin/admin/reimbursement-list/resolved',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AdminResolvedReimbursementsTable />
    </div>
  )
}
