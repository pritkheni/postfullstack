import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const handler = async (req: Request) => {
  if (req.method === "DELETE") {
    console.log(`this is get method`);
    const session = await getServerSession(authOption);
    if (!session)
      return NextResponse.json(
        { message: "Please Login to add post" },
        { status: 401 }
      );
    try {
      const postId = await req.json();
      console.log(`================= delete this ==================`);

      console.log(postId);

      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      console.log(result);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.log(`===================== error =============================`);
      console.log(error);
      return NextResponse.json(
        { message: "Error while deleteting post " },
        { status: 500 }
      );
    }
  }
};

export { handler as DELETE };
