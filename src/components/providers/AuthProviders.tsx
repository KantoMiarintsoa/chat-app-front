"use client"
import { Session } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../action";

type AutContextType={
    session:Session |null;
    setSession:(session:Session |null)=>void;
    status:"loading" |"authentificated"|"unauthenticated"
}
const AuthContext=createContext<AutContextType>({
    session:null,
    setSession:()=>{},
    status:"loading"
})


function AuthProvider({children}:{children:React.ReactNode}){
    const [session,setSession]=useState<Session |null>(null);
    const [status,setStatus]=useState<"loading" | "authentificated" | "unauthenticated">("loading")

    useEffect(()=>{
        async function fetchSession(){
            const session=await getSession();

            if(!session){
                setSession(null)
                setStatus("unauthenticated")
            }
            else{
                setSession(session)
                setStatus("authentificated")
            }
        }

        fetchSession()
    }, [])

    return (
        <AuthContext.Provider value={{session,setSession,status}}>
            {children}
        </AuthContext.Provider>
    )

}
export function useAuth(){
    return useContext(AuthContext)

}
export default AuthProvider