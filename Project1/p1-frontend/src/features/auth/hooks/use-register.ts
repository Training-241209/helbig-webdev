import{useMutation} from "@tanstack/react-query"
import { RegisterSchema } from "../schemas/register-schema"
import { axiosAuthInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export function useRegister(){
    const router = useRouter();
    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosAuthInstance.post("/register", values);
            return resp.data;
        },
        onSuccess: () =>{
            toast.success("Account registered.");
            router.navigate({to: "/auth/login"});
        },
        onError: () =>{
            toast.error("Error registering an account.")
        }
    });
}