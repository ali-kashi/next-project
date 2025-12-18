"use client"

import { useSession,signIn,signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Header(){
    const {data: session} = useSession()
    const [isRender,setIsRender] = useState(false)

    useEffect(
        ()=> setIsRender(true)
        ,[])

    if(!isRender)
        return null

    return(
        <header>
            <div>
                {
                    session?(
                    <>
                    <span>Hi {session.user.name}</span>
                    <button onClick={()=>signIn()}>signOut</button>
                    </>
                ):
                <button onClick={()=>signIn()}>signIn</button>
            }
            </div>
        </header>
    )
}