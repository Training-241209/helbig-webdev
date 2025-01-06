import { axiosAdminInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export function useAdminUser(){
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const resp = await axiosAdminInstance.get("/users", {
                headers: {
                    "Authorization": localStorage.getItem("jwt"),
                }
            });
            return resp.data;
        }
        
    })
}