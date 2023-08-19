import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className='text-3xl'>
      <h1 className="text-4xl pb-4"> Página inicial</h1>
      <div className="flex justify-center">
        <Link href={'/admin'} className={buttonVariants() }>Ver minha página</Link>
      </div>
      {/* <h2>client session</h2>
      <User />
      <h2>Server session</h2>
      {JSON.stringify(session)} */}
    </div>
  )
}
