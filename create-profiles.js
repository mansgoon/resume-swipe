import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createProfilesForExistingUsers() {
  try {
    // Get all users without profiles
    const usersWithoutProfiles = await prisma.user.findMany({
      where: {
        profile: null
      }
    });

    // Create profiles for these users
    for (const user of usersWithoutProfiles) {
      await prisma.profile.create({
        data: {
          userId: user.id
        }
      });
      console.log(`Created profile for user ${user.id}`);
    }

    console.log('Finished creating profiles for existing users');
  } catch (error) {
    console.error('Error creating profiles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createProfilesForExistingUsers();