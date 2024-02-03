import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const handler = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  if (req.method === "GET") {
    const slug = params.slug;
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: slug,
        },
        include: {
          user: true,
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              use: true,
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

export { handler as GET };
