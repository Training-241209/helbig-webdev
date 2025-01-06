import { useUserReimbursements } from "../hooks/use-user-reimbursements";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table"
import { UserReimbursementSchema } from "../schemas/user-reimbursements-schema";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper<UserReimbursementSchema>();

const columns = [
    columnHelper.accessor("rembId", {
        header: () => 'Reimbursement ID',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
        header: () => 'Description',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
        header: () => 'Amount',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
        header: () => 'Status',
        cell: (info) => info.getValue(),
    }),
]

export function UserReimbursementTable(){
    const {data} = useUserReimbursements();

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
                    {table.getHeaderGroups().map((headerGroup) =>(
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="user-reimb-cell">
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
                                <td key={cell.id} className="user-reimb-cell">
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
    );
}