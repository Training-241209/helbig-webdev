import {useForm} from "react-hook-form";
import { registerFormSchema, RegisterSchema } from "../schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "../hooks/use-register";
import { Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
 } from "@/components/ui/form";

 export function RegisterForm(){
    const {mutate: register, isPending} = useRegister();
    
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: RegisterSchema){
        if(values.password !== values.confirmPassword){
            form.setError("confirmPassword",{
                message: "Passwords do not match.",
            });
            return;
        }
        register(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="firstName" placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="lastName" placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="username" placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    Register
                </Button>
            </form>
        </Form>
    );
 }