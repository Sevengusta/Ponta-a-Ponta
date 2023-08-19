import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import * as z from 'zod';

// difinindo um schema para o validação do input

const userSchema = z.object({
    username: z
      .string({required_error: "O usuário é obrigatório"})
      .max(30)
      .min(3, "Digite no mínimo 3 caracteres "),
    email: z
      .string({required_error: "O email é obrigatório"})
      .min(1, "")
      .email("Email inválido"),
    password: z
      .string({
        required_error: "A senha é obrigatória",
        invalid_type_error: "Digite apenas números"
      })
      .min(1, "Esse campo é obrigatório")
      .min(8, "A senha precisa ter pelo menos oito dígitos"),
    
  })
  


export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { email, username, password } = userSchema.parse(body)

        //checar se o email já foi cadastrado
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Esse email já foi cadastrado por um usuário"  }, {status: 409})
        }
        //checar se o usuário já foi cadastrado
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        })
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Esse nome já foi cadastrado por um usuário"  }, {status: 409})
        }

        const hashedPassword =  await hash(password, 10 )
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        const {password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({user: rest, message: 'Usuário criado corretamente'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: 'Algo deu Errado!'}, {status: 500})
    }
}