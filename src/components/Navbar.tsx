
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { Key } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { signOut } from 'next-auth/react'
import UserAccountnav from './UserAccountnav'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10 top-0 absolute' >
        <div className='container flex justify-between items-center'>
            <Link href={'/'}><Key /></Link>
            {session?.user ? (
              <UserAccountnav />
            ) :  (
              <Link className={buttonVariants()} href={'/sign-in'}>Entrar</Link>
            )}
        </div>
    </div>
  )
}

export default Navbar

