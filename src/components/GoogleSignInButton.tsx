import React, { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface GoogleSingIn {
    children: ReactNode
}

const GoogleSingInButton: FC<GoogleSingIn> = ({children}) => {
    const loginWithGoogle  = () => console.log('login')

  return <Button onClick={loginWithGoogle} className=" w-full">{children}</Button>
};

export default GoogleSingInButton;
