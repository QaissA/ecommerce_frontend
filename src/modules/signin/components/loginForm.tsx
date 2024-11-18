import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";





const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const userSchema = z.object({
        email: z.string().email({ message: "Invalid email adress" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" })

    })

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            console.log("login successful", data);
        },
        onError: (error: any) => {
            console.log("login failed", error.message)
        }
    })

    const onSubmit = (data: z.infer<typeof userSchema>) => {
        mutation.mutate(data);
    }

    return (
        <Form {...form}>
            <form className="w-[30%]" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormDescription>
                                insert your email to log in.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Password</FormLabel>
                            <FormControl>
                                <div className="flex border rounded-md focus-visible:border">
                                    <Input placeholder="password" type={showPassword ? "text" : "password"} className="border-0 focus-visible:ring-transparent" {...field} />
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription>
                                insert your password to log in.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className="flex justify-center items-center">
                    <Button className="my-5 w-[100%]" variant="default">
                        Login
                    </Button>
                </div>
            </form>
        </Form>

    )
}

export default LoginForm