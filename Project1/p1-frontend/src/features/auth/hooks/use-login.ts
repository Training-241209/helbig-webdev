import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/login-schema";
import { axiosAuthInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";


export function useLogin(){
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (values: LoginSchema) => {
            const resp = await axiosAuthInstance.post("/login", values);
            localStorage.setItem("jwt", resp.data["authorization"]);
            const token = resp.data['authorization'];
            return token;
        },
        onSuccess: (values) =>{
            queryClient.invalidateQueries({queryKey: ['auth']});
            queryClient.setQueryData(['auth'], values);
            toast.success("Logged in.");
            router.navigate({to: "/user/reimbursement-list"});
        },
        onError: () => {
            toast.error("Login failed.");
        },
    });
}