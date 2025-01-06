import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useFinishedReimbursements } from "../hooks/use-finished-reimbursements";
import { AdminResolvedReimbursementsSchema } from "../schemas/admin-resolved-reimbursement-schema";

const columnHelper = createColumnHelper<AdminResolvedReimbursementsSchema>();

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
]

export function AdminResolvedReimbursementsTable(){
    const {data} = useFinishedReimbursements();

    const table = useReactTable({
        data: data || [],
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return(
        <div className="flex items-center justify-center">
            <table className="w-full min-w-max table-auto text-left bg-white">
                <thead className="border-y-4">
                    {table.getHeaderGroups().map((headerGroups) => (
                        <tr key={headerGroups.id}>
                            {headerGroups.headers.map((header) => (
                                <th key={header.id} className="admin-reimb-resolved-cell">
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
                                <td key={cell.id} className="admin-reimb-resolved-cell">
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
        </div>
    )
}