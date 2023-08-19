import React, { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}


const AuthLayout: FC<LayoutProps> = ( {children}) => {
  return (
    <div className='bg-slate-200 p-10 rounded-md'>{children}</div>
  )
}

export default AuthLayout