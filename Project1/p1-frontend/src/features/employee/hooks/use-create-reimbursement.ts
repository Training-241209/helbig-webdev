import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { CreateReimbursementSchema } from "../schemas/create-reimbursement-schema";
import { axiosUserInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useCreateReimbursement(){
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (values: CreateReimbursementSchema) => {
            //const token = "" + queryClient.getQueryData(['auth']);
            //console.log(queryClient.getQueryData(['user-reimbs']));
            //console.log(queryClient.getQueryData(['auth']));
            const resp = await axiosUserInstance.post("/reimbursement-list", values, {headers: 
                {
                    "Authorization": localStorage.getItem("jwt"),
                    "withCredentials": true,
                    "Content-Type": "application/json",
                }
            });
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user-reimbs']});
            toast.success("Reimbursement Created");
            router.navigate({to: "/user/reimbursement-list"});
        },
        onError: () => {
            toast.error("Failed to create toast");
        }
    });
}