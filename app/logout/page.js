'use client'

import { useSession } from 'next-auth/react'
import LogoutButton from '@/components/logoutButton'

export default function ExamplePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      {session ? (
        <>
          <p>Hello, {session.user.name || session.user.email}</p>
          <LogoutButton />
        </>
      ) : (
        <p>Please log in to view this page</p>
      )}
    </div>
  )
}