import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateReimbursementForm } from '@/features/employee/components/create-reimbursement-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/user/create-reimbursement',
)({
  component: RouteComponent,
})

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
          <CreateReimbursementForm />
        </CardContent>
      </Card>
    </div>
  )
}
