import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/use-login";
import { loginFormSchema, LoginSchema } from "../schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm(){
    const {mutate: login, isPending}= useLogin();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues:{
            username: "",
            password: "",
        },
    });

    function onSubmit(values: LoginSchema){
        login(values);
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                <Button type="submit" disabled={isPending}>
                    Login
                </Button>
            </form>
        </Form>
    );
}