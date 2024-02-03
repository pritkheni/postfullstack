import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/options";
import prisma from "@/app/libs/client";
const handler = async (req: Request) => {
  if (req.method === "POST") {
    console.log(`this is post method`);
    const session = await getServerSession(authOption);
    if (!session)
      return NextResponse.json(
        { message: "Please Login to add post" },
        { status: 401 }
      );
    try {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
      });
      const body = await req.json();
      console.log(body);
      console.log(body.data);

      const { title, postId } = body.data;
      console.log(title, postId);

      if (title.length > 300) {
        return NextResponse.json(
          { message: "Please write a sorter comment" },
          { status: 403 }
        );
      }
      if (!title.length) {
        return NextResponse.json(
          { message: "Please write a Comment" },
          { status: 403 }
        );
      }
      const data = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id || "",
          postId,
        },
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error while uploading post" },
        { status: 500 }
      );
    }
  }
};

export { handler as POST };
