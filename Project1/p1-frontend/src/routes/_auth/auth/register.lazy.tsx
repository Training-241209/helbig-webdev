import { RegisterForm } from '@/features/auth/components/register-form'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createLazyFileRoute('/_auth/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2x1">Register</CardTitle>
        <CardDescription>
          Enter your details to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p>Have an account already?&nbsp;</p>
        <Link to={"/auth/login"} className="underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  )
}
