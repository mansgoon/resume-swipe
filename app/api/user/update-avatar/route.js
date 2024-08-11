import { createClient } from '@supabase/supabase-js';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${session.user.id}-${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars') // Replace with your bucket name
      .getPublicUrl(fileName);

    // Update the user's avatar URL in the database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: publicUrl },
    });

    return NextResponse.json({ message: 'Avatar updated successfully', image: updatedUser.image });
  } catch (error) {
    console.error('Error updating avatar:', error);
    return NextResponse.json({ message: 'Error updating avatar', error: error.message }, { status: 500 });
  }
}