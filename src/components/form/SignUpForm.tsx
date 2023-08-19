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
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  username: z
    .string({required_error: "O usuário é obrigatório"})
    .max(30)
    .min(3, "Digite no mínimo 3 caracteres "),
  email: z
    .string({required_error: "O email é obrigatório"})
    .min(1, "")
    .email("Use um formato de email válido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "Digite apenas números"
    })
    .min(1, "Esse campo é obrigatório")
    .min(8, "A senha precisa ter pelo menos oito dígitos"),
  confirmPassword: z
    .string({
      required_error: "Por favor, confirme a senha",
      invalid_type_error: "Digite apenas números"
    })
    .min(1, "Por favor, confirme a senha")
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas digitadas são diferentes'
})

const SignUpForm = () => {
  const router = useRouter()
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      })
    })
    if (response.ok) {
      router.push('/sign-in')
    }else {
      toast({
        title: "Erro",
        description: "opa!, algo deu errado!",
        variant: 'destructive'
      })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sevengusta"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Redigite sua senha</FormLabel>
                <FormControl>
                  <Input placeholder="Redigite sua senha" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Cadastrar
        </Button>
      </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly 
          before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
          after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
      >
        ou
      </div>
      <GoogleSingInButton>Cadastrar com o google</GoogleSingInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Se você já possui uma conta, por favor&nbsp;
        <Link className="text-blue-500 hover:underline" href={"/sign-in"}>
          entre
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
