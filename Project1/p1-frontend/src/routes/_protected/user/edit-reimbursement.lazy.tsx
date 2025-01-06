import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EditReimbursementsForm } from '@/features/employee/components/edit-reimbursements-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/user/edit-reimbursement')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <div className="flex flex-col w-5/12 items-center justify-center mx-auto">
      <Card className="w-[400px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2x1">Create A New Reimbursement</CardTitle>
          <CardDescription>
            Create a new reimbursement ticket with description and amount.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditReimbursementsForm />
        </CardContent>
      </Card>
    </div>
  )
}
