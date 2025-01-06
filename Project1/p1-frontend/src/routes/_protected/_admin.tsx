import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAdmin } from '@/features/admin/hooks/use-admin';

export const Route = createFileRoute('/_protected/_admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const {data: admin} = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if(admin) {
      router.navigate({to: "/admin/reimbursement-list"});
    }
  }, [admin]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
