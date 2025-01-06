import { axiosAdminInstance } from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useAdmin(): UseQueryResult<{admin: boolean}>{
    const router = useRouter();
    
    return useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            try{
                const storedJwt = localStorage.getItem('jwt');
                const resp = await axiosAdminInstance.get("/me", {
                    headers:{
                        'Authorization': storedJwt
                    }
                });
                return resp.data;
            } catch(e){
                console.error(e);
                router.navigate({to: "/user/reimbursement-list" });
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}