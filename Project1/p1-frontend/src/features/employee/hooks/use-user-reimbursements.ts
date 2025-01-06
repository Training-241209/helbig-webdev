import { axiosUserInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserReimbursements(){

    return useQuery({
        queryKey: ['user-reimbs'],
        queryFn: async () => {
            //console.log(queryClient.getQueryData(['auth']));
            try{
                const resp = await axiosUserInstance.get("/reimbursement-list", {
                    headers:{
                        'Authorization': localStorage.getItem('jwt'),
                    }
                });
                return resp.data;
            } catch(e) {
                console.error(e);
                toast.error("Error fetching user reimbursements")
                return null;
            }
        }
    });
}