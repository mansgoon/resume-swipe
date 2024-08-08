import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { email, username } = await req.json();

    // Check if email is already in use
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
      }
    }

    // Check if username is already in use
    if (username !== session.user.name) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        return NextResponse.json({ message: 'Username already in use' }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        email, 
        username
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json({ message: 'Error updating account', error: error.message }, { status: 500 });
  }
}