import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({children}: {children: ReactNode}) => {
  /*
  Note: The following two sections are equivalent 
  <AuthProvider>
    {children}
  </AuthProvider>
  and 
  <AuthProvider children={children}/>
  which means that, in either case, AuthProvider should be able to take an argument parameter called children with spedified type, if in typescript 
  **/
 return <AuthProvider>
  {children}
 </AuthProvider>

}