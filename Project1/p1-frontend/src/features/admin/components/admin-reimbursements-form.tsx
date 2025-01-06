import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { AdminReimbursementsSchema } from "../schemas/admin-reimbursements-schema";
import { useAdminReimbursements } from "../hooks/use-admin-reimbursements";
import { Button } from "@/components/ui/button";
import { useResolveReimbursement } from "../hooks/use-resolve-reimbursement";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const columnHelper = createColumnHelper<AdminReimbursementsSchema>();

const columns = [
    columnHelper.accessor("userId", {
        header: () => "User ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rembId", {
        header: () => "Reimbursement ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
        header: () => "Description",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
        header: () => "Amount",
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: "actions",
        cell: ({row}) =>{
            const updateStatus = useResolveReimbursement();

            const updateStatusHandler = (status: string) => {
                updateStatus.mutate({rembId: row.original.rembId, status: status})
            }

            return (
                <Select onValueChange = {(value) => updateStatusHandler(value)}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="ACCEPTED">Approve</SelectItem> 
                        <SelectItem value="DENIED">Deny</SelectItem>
                    </SelectContent>
                </Select>
            )
        }
    })
]

export function AdminReimbursementsTable(){
    const {data} = useAdminReimbursements();

    const table = useReactTable({
        data: data || [],
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return(
        <div className="flex flex-col items-center justify-center">
            <table className="w-full min-w-max table-auto text-left bg-white">
                <thead className="border-y-4">
                    {table.getHeaderGroups().map((headerGroups) => (
                        <tr key={headerGroups.id}>
                            {headerGroups.headers.map((header) => (
                                <th key={header.id} className="admin-reimb-cell">
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