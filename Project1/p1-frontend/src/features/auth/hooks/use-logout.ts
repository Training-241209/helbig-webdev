import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useLogout(){
    const queryClient = useQueryClient();
    const router = useRouter();
    return () =>{
        queryClient.clear();
        localStorage.removeItem("jwt");

        router.navigate({to: "/auth/login"});
    }
}