import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const getToken = async () => {
  const session: any = await getServerSession(authOption)
  return session;
}
const handler =async (req:Request) => {
    if(req.method === "POST"){
        console.log('================POST body====================');
        const session = await getServerSession(authOption)
        if(!session)return NextResponse.json({message:"Please Login to add post"},{status:401})
        const prismaUser = await prisma.user.findUnique({
            where:{email:session.user?.email||""}})
        const body = await req.json()
        const title:string = body.title
        if(title.length > 300){
            return NextResponse.json({message:"Please write a sorter post"},{status:403})
        }
        if(!title.length){
            return NextResponse.json({message:"Please write a post"},{status:403})
        }
        try{
            const result = await prisma.post.create({
                data:{
                    title:title,
                    userId:prismaUser?.id || ""
                }
            })
            return NextResponse.json(result,{status:200})
        }catch(error){
            return NextResponse.json({message:"internal server error"},{status:500})
        }
    }else if(req.method === "GET"){
        console.log('================GET body====================');
        const session = await getToken()
        console.log(session);
        console.log(req.body);
    }
}


export { handler as GET, handler as POST }


