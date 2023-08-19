"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSingInButton from "../GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z
    .string({required_error: "O email é obrigatório"})
    .email("Use um formato de email válido"),
  password: z
    .string({invalid_type_error: "A senha é composta apenas por números"})
});

const SignInForm = () => {
  const router = useRouter();
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if(signInData?.error) {
      toast({
        title: "Erro",
        description: "opa!, algo deu errado!",
        variant: 'destructive'
      })

    }else {
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email@exemplo.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Insira sua senha" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Entrar
        </Button>
      </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly 
          before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
          after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
      >
        ou
      </div>
      <GoogleSingInButton>entrar com o google</GoogleSingInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Se você não possui uma conta, por favor&nbsp;
        <Link className="text-blue-500 hover:underline" href={"/sign-up"}>
          cadastre-se
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
