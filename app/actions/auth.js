// app/actions/auth.js
'use server'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import EmailTemplate from '@/components/EmailTemplate'
import { cookies } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut } from 'next-auth/react'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
    try {
      // Check if username already exists
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
  
      if (existingUsername) {
        return { success: false, message: 'Username is already taken. Please choose a different username.' };
      }
  
      // Check if email already exists
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingEmail) {
        return { success: false, message: 'An account with this email address already exists. Please log in or use a different email.' };
      }
  
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verificationToken,
        },
      });
  
      await sendVerificationEmail(email, verificationToken);
  
      return { success: true, message: 'User registered successfully. Please check your email to verify your account.' };
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return { success: false, message: 'An account with this email address already exists. Please log in or use a different email.' };
      }
      
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

export async function logout() {
    try {
      // Clear the session
      await signOut({ redirect: false })
  
      // Clear any custom cookies you might have set
      cookies().delete('next-auth.session-token')
      cookies().delete('auth_token') // If you have this custom cookie
  
      return { success: true, message: 'Logged out successfully' }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Logout failed. Please try again.' }
    }
  }

  export async function login(email, password) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        return { 
          success: false, 
          message: 'No account found with this email address. Please check your email or sign up for a new account.'
        };
      }
  
      if (!user.emailVerified) {
        return { 
          success: false, 
          message: 'Your email address has not been verified. Please check your inbox to activate your account.'
        };
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { 
          success: false, 
          message: 'Incorrect password. Please try again or use the "Forgot Password" option if you need to reset it.'
        };
      }
  
      // Generate and set session token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: '1d' }
      );
  
      cookies().set('next-auth.session-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 1 day in seconds
      });
  
      return { success: true, message: 'Logged in successfully. Welcome back!' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'An unexpected error occurred during login. Please try again later or contact support if the problem persists.'
      };
    }
  }

export async function verifyEmail(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { email: decoded.email }
      });
  
      if (!user) {
        return { success: false, message: 'User not found' };
      }
  
      if (user.emailVerified) {
        return { success: false, alreadyVerified: true, message: 'Email verified!' };
      }
  
      if (user.verificationToken !== token) {
        return { success: false, message: 'Invalid or expired verification token' };
      }
  
      await prisma.user.update({
        where: { email: decoded.email },
        data: { 
          emailVerified: true,
          verificationToken: null 
        },
      });
  
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      console.error('Email verification error:', error);
      if (error instanceof jwt.TokenExpiredError) {
        return { success: false, message: 'Verification link has expired. Please request a new one.' };
      }
      return { success: false, message: 'Email verification failed. Please try again.' };
    }
  }

async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  try {
    await resend.emails.send({
      from: 'admin@seicubz.com',
      to: email,
      subject: 'Verify your email',
      react: EmailTemplate({ verificationLink }),
    })
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send verification email')
  }
}