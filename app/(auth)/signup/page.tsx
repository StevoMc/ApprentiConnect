"use client";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import { signup } from "@/lib/auth";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  firstname: z.string().min(0, {
    message: "firstname required",
  }),
  lastname: z.string().min(0, {
    message: "lastname required",
  }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export default function SignUpCard() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await signIn("credentials", values);

      const response = await axios
        .post("/api/auth/register", {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        })
        .catch((e) => {
          console.error(e);
          return e;
        });

      console.log(response);

      if (response instanceof AxiosError) {
        toast.error(`${response.name}: ${response.response?.data?.error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (response === null) {
        toast.error("Signup failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.reset({
          ...values,
          password: "",
        });
        form.setFocus("password");
        return;
      }

      toast.success("Signup successful", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      form.reset();
      router.replace(`/signin`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Card className="w-[32rem] border-ring/75 max-w-full bg-card p-8">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <ModeToggle />
          </div>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Your First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500">
                          {form.formState.errors.firstname?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Your Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500">
                          {form.formState.errors.lastname?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase">
                        E-Mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                          placeholder="Enter Your E-Mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500">
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="password"
                          autoComplete="new-password"
                          required
                          className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Separator />
                <Button disabled={isLoading} className="w-full">
                  Create account
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <p>or</p>
            <Button
              onClick={() => {
                router.replace("/signin");
              }}
              variant={"outline"}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
