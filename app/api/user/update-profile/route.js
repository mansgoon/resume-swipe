import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { displayName, field, aboutMe } = await req.json();

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: { 
        displayName, 
        field, 
        aboutMe 
      },
      create: {
        userId: session.user.id,
        displayName,
        field,
        aboutMe
      },
    });

    console.log('Profile updated successfully:', updatedProfile);

    return NextResponse.json(updatedProfile);

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ 
      message: 'Error updating profile', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}