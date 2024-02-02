'use client'
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
type LoggedProps = {
    image:string
}
export default function Logged(props:LoggedProps){
    return(
        <li className="flex gap-8 items-center">
            <button onClick={() => {signOut()}} className="bg-gray-700 text-sm py-2 px-6 text-white rounded-md">Sign out</button>
            <Link href={"/dashboard"}>
                <Image className="rounded-full" width={64} height={64} src={props.image} alt="profile image" priority/>
            </Link>
        </li>
    )
}