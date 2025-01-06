import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReimbursement } from "../hooks/use-create-reimbursement";
import { createReimbursementSchema, CreateReimbursementSchema } from "../schemas/create-reimbursement-schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateReimbursementForm(){
    const {mutate: createReimbursement, isPending} = useCreateReimbursement();

    const form = useForm<CreateReimbursementSchema>({
        resolver: zodResolver(createReimbursementSchema),
        defaultValues:{
            description: "",
            amount: 0,
        },
    });

    function onSubmit(values: CreateReimbursementSchema){
        createReimbursement(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) =>(
                        <FormItem>
                            <FormControl>
                                <Input type="description" placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) =>(
                        <FormItem>
                            <FormControl>
                                <Input type="number" {...field}
                                    onChange={(e) => {
                                        field.onChange(parseInt(e.target.value, 10));
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    Submit Reimbursement
                </Button>

            </form>
        </Form>
    );
}