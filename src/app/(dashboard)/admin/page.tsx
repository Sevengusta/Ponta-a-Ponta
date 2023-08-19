import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  if( session?.user){
    return <h2 className='text-2xl'>Usuário logado - Bem vindo, {session?.user.username} </h2>
  }


  return (
    <h2 className='text-2xl'>Por favor, entre para ver sua página pessoal</h2>
  )
}

export default page