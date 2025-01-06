import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUserSchema } from "../schemas/delete-user-schema";
import { axiosAdminInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useDeleteUser(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: DeleteUserSchema) => {
            const resp = await axiosAdminInstance.delete("users", {
                data: {
                    "userId": values.userId,
                },
                headers: {
                    "Authorization": localStorage.getItem('jwt'),
                }
            });
            return resp.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['admin-users']});
            toast.success("Deleted user")
        },
        onError: () => {
            toast.error("Error deleting user")
        }
    })
}