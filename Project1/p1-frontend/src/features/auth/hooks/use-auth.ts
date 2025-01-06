import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { axiosAuthInstance } from "@/lib/axios-config";

export function useAuth(): UseQueryResult<{username: string}>{
    const router = useRouter();
    
    return useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            try{
                const storedJwt = localStorage.getItem('jwt');
                const resp = await axiosAuthInstance.get("/me", {
                    headers:{
                        'Authorization': storedJwt
                    }
                });
                return resp.data;
            } catch(e){
                console.error(e);
                router.navigate({to: "/auth/login" });
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}