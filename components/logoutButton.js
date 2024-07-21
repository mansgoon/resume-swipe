'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await signOut({ redirect: false, callbackUrl: '/' })
    
    if (result.url) {
      router.push(result.url)
    } else {
      // Handle any errors here
      console.error('Logout failed')
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  )
}