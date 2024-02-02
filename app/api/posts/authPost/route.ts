import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const handler = async (req: Request) => {
  if (req.method === "GET") {
    console.log(`this is get method`);

    const session = await getServerSession(authOption);
    if (!session)
      return NextResponse.json(
        { message: "Please Login to add post" },
        { status: 401 }
      );
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      console.log(data);
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
