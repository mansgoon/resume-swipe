import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  console.log('API route called with params:', params);

  let username = params?.username?.toLowerCase();

  // Handle undefined string case and fallback to query params
  if (!username || username === 'undefined') {
    const { searchParams } = new URL(request.url);
    username = searchParams.get('username')?.toLowerCase();
    console.log('Username from query params:', username);
  }

  // Fallback to session if username still not found
  if (!username || username === 'undefined') {
    const session = await getServerSession(authOptions);
    if (session?.user?.username) {
      username = session.user.username.toLowerCase();
      console.log('Username from session:', username);
    } else {
      console.error('No valid username provided and no session available');
      return NextResponse.json({ message: 'No valid username provided' }, { status: 400 });
    }
  }

  try {
    console.log('Attempting to find user with username:', username);
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      },
      include: { profile: true },
    });

    if (!user) {
      console.log('User not found for username:', username);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user.username);
    return NextResponse.json({
      username: user.username,
      name: user.name,
      image: user.image,
      hiresRating: user.hiresRating,
      profile: user.profile,
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return NextResponse.json({ message: 'Error fetching user data', error: error.message }, { status: 500 });
  }
}
