import { axiosUserInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export function useUserReimbursements(){

    return useQuery({
        queryKey: ['user-reimbs'],
        queryFn: async () => {
            //console.log(queryClient.getQueryData(['auth']));
            const resp = await axiosUserInstance.get("/reimbursement-list", {
                headers:{
                    'Authorization': localStorage.getItem('jwt'),
                }
            });
            return resp.data;
        }
    });
}