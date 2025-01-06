import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResolveReimbursementSchema } from "../schemas/resolve-reimbursement-schema";
import { axiosAdminInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useResolveReimbursement(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: ResolveReimbursementSchema) => {
            const resp = await axiosAdminInstance.patch("reimbursement-list", values, {
                headers: {
                    "Authorization": localStorage.getItem('jwt'),
                }
            });
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-reimbursements"]});
            toast.success("Reimbursement Status Updated.");
        },
        onError: () => {
            toast.error("Reimbursement Status Update Failed.");
        }
    });
}