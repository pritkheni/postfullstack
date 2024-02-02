import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const getToken = async () => {
  const session: any = await getServerSession(authOption);
  return session;
};
const handler = async (req: Request) => {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          Comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching post" },
        { status: 500 }
      );
    }
  }
};

export { handler as GET, handler as POST };
