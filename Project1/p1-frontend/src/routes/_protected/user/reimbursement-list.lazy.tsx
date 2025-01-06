import { UserReimbursementTable } from '@/features/employee/components/user-reimbursements-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/user/reimbursement-list',
)({
  component: RouteComponent,
})

function RouteComponent(){
    return (
        <div>
            <UserReimbursementTable />
        </div>
    )
}