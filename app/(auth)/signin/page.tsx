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
import { toast } from "react-toastify";
// import { signin } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";

import "../style.module.css";

// import { ActionTooltip } from "@/components/action-tooltip";
// import { Button } from "@/components/ui/button";
// import { PenBox } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z.string().min(1, {
    message: "Password must be provided",
  }),
});

export const SignInCard = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(`POSTing ${JSON.stringify(values, null, 2)}`);
    await signIn("credentials", {
      ...values,
    }).catch((e) => {
      console.log(e);
      toast.error(`${"SIGNIN"}: ${e}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleFormFieldPasswordReset(values);
    });
    toast.success("Login successful", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    form.reset();
    router.push(`/`);
  };

  const handleFormFieldPasswordReset = (values: z.infer<typeof formSchema>) => {
    form.reset({
      ...values,
      password: "",
    });
    form.setFocus("password");
  };

  return (
    <>
      <Card className="w-[32rem] max-w-full p-8">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
            <ModeToggle />
          </div>
          <CardDescription>Provide your login credentials</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase">
                        Email or Username
                      </FormLabel>
                      <FormControl>
                        {(isLoading && (
                          <Input
                            disabled
                            className="bg-muted text-muted-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        )) || (
                          <Input
                            className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        )}
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
                        {(isLoading && (
                          <Input
                            disabled
                            type="password"
                            className="border-0 bg-muted text-muted-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Password"
                            {...field}
                          />
                        )) || (
                          <Input
                            type="password"
                            className="border-0 bg-secondary text-foreground focus-visible:ring-1 focus-visible:ring-offset-0"
                            placeholder="Enter Password"
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage className="text-xs text-red-500">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Separator />
                {(isLoading && (
                  <Button
                    className="w-full cursor-progress"
                    variant="secondary"
                    disabled
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )) || <Button className="w-full">Login</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <p>or</p>
            <Button
              onClick={() => {
                router.push("/signup");
              }}
              variant={"outline"}
              className="w-full"
            >
              Create account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignInCard;
