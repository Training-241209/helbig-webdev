import { axiosAdminInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminUser(){
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            try{
                const resp = await axiosAdminInstance.get("/users", {
                    headers: {
                        "Authorization": localStorage.getItem("jwt"),
                    }
                });
                return resp.data;
            } catch(e) {
                console.error(e);
                toast.error("Error fetching users");
                return null;
            }
        }
        
    })
}