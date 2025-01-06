import { axiosAdminInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminPromoteUserSchema } from "../schemas/admin-promote-user";
import { toast } from "sonner";

export function usePromoteUser(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: AdminPromoteUserSchema) => {
            const resp = await axiosAdminInstance.patch("users", values, {
                headers: {
                    "Authorization": localStorage.getItem("jwt"),
                }
            });
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-users"]});
            toast.success("User promoted");
        },
        onError: () => {
            toast.error("Error promoting user");
        }
    })
}