import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/options";
import Logged from "./Logged";
export default async function Nav() {
    const session = await getServerSession(authOption)
    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={"/"}>
                <h1 className="font-bold">Send it</h1>
                {/* //render client components */}

            </Link>
            <ul className="flex items-center gap-6">
                {!session?.user && <Login/>}
                {session?.user && <Logged image={session.user?.image || ""}/>}
            </ul>
        </nav>
    )

}