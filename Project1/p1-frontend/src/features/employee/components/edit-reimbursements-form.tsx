import { useForm } from "react-hook-form";
import { useEditReimbursement } from "../hooks/use-edit-reimbursement";
import { editReimbursementSchema, EditReimbursementSchema } from "../schemas/edit-reimbursement-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function EditReimbursementsForm(){
    const {mutate} = useEditReimbursement();

    const form = useForm<EditReimbursementSchema>({
        resolver: zodResolver(editReimbursementSchema),
        defaultValues: {
            rembId: 0,
            description: "",
            amount: 0,
        }
    });

    function onSubmit(values: EditReimbursementSchema) {
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Reimbursement Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="0" {...field} />
                            </FormControl>
                        </FormItem>
                    )}>
                </FormField>
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Reimbursement Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Desc" {...field} />
                            </FormControl>
                        </FormItem>
                    )}>
                </FormField>
                <Button type="submit">Submit</Button>

            </form>
        </Form>
    )
}