import { axiosAdminInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useAdminReimbursements(){
    const router = useRouter();
    return useQuery({
        queryKey: ["admin-reimbursements"],
        queryFn: async () => {
            try{
                const resp = await axiosAdminInstance.get("/reimbursement-list/pending",{
                    headers: {
                        "Authorization": localStorage.getItem("jwt"),
                    }
                });
                return resp.data;
            } catch(e){
                console.error(e);
                router.navigate({to: "/user/reimbursement-list" });
                return null;
            }
        }
    });
}