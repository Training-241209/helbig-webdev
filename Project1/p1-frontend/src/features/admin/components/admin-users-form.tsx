import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { AdminUsersSchema } from "../schemas/admin-users-schema";
import { useAdminUser } from "../hooks/use-admin-users";
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "../hooks/use-delete-user";
import { usePromoteUser } from "../hooks/use-promote-user";

const columnHelper = createColumnHelper<AdminUsersSchema>();

const columns = [
    columnHelper.accessor("userId", {
        header: () => "User ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("username", {
        header: () => "Username",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstname", {
        header: () => "First Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastname", {
        header: () => "Last Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
        header: () => "Role",
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: 'actions',
        cell: ({row}) => {
            const deleteUser = useDeleteUser();
            const promoteUser = usePromoteUser();

            function deleteCallback(){
                deleteUser.mutate({userId: row.original.userId})
            }

            function promoteCallback(){
                promoteUser.mutate({userId: row.original.userId})
            }

            return (
                <div>
                    <Button onClick={() => deleteCallback()} variant="destructive">Delete</Button>
                    <Button onClick={() => promoteCallback()} variant="default">Promote</Button>
                </div>
            )
        }
    })
]

export function AdminUsersTable(){
    const {data} = useAdminUser();

    const table = useReactTable({
        data: data || [],
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });



    return (
        <div className="flex flex-col items-center justify-center">
            <table className="w-full min-w-max table-auto text-left bg-white">
                <thead className="border-y-4">
                    {table.getHeaderGroups().map((headerGroups) => (
                        <tr key={headerGroups.id}>
                            {headerGroups.headers.map((header) => (
                                <th key={header.id} className = "admin-users-cell">
                                    {flexRender(
                                        header.column.columnDef.header, 
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="admin-reimb-cell">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center py-2">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    variant={"outline"}
                    size="sm">&lt; Previous
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    variant={"outline"}
                    size="sm">Next &gt;
                </Button>
            </div>
        </div>
    )
}