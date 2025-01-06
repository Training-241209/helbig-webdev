import { Header } from '@/components/shared/header';
import { useAuth } from '@/features/auth/hooks/use-auth'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
});

function RouteComponent() {
  const {data: auth} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!auth) {
      router.navigate({to: "/auth/login"});
    }
  }, [auth]);
  return (
    <div>
      <Header />
      <div className="container relative flex flex-col justify-center min-w-screen-2xl mx-auto w-11/12 py-16">
          <Outlet />
      </div>
    </div>
  );
}
