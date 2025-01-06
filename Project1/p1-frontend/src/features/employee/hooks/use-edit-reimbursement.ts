import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditReimbursementSchema } from "../schemas/edit-reimbursement-schema";
import { axiosUserInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useEditReimbursement(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: EditReimbursementSchema) => {
            const resp = await axiosUserInstance.patch("/admin/users", values, {
                headers: {
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
        }
    })
}