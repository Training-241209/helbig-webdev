import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useAdmin } from "@/features/admin/hooks/use-admin";

export function Header(){
    const logout = useLogout();
    const {data: admin} = useAdmin();

    function adminLinks(){
        if(admin){ 
            return(
            <div>
                <Link to="/admin/reimbursement-list" className={buttonVariants({ variant: "link" })}>Admin Pending Reimbursements</Link>
                <Link to="/admin/users-list" className={buttonVariants({ variant: "link"})}>Admin Employee List</Link>
            </div>
        )}
    }

    return(
        <nav className="flex max-width-full h-[65px] bg-slate-200 top-0 border-b-2 sticky z-50 items-center">
            <div className="text-lg font-bold mr-10 ml-10">
                Reimbursement Service
            </div>
            <div>
                <Link to="/user/reimbursement-list" className={buttonVariants({ variant: "link"})}>User Reimbursements</Link>
                <Link to="/user/create-reimbursement" className={buttonVariants({ variant: "link" })}>Create Reimbursement</Link>
            </div>
            {adminLinks()}
            <div className="mx-auto flex justify-end">
                <Button onClick={logout}>Logout</Button>
            </div>
        </nav>
    )
}