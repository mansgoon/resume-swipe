'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyEmail } from '@/app/actions/auth'

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token).then((result) => {
        if (result.success) {
          setStatus('success')
          setMessage(result.message)
          setTimeout(() => router.push('/login'), 3000)
        } else if (result.alreadyVerified) {
          setStatus('alreadyVerified')
          setMessage(result.message)
          setTimeout(() => router.push('/login'), 3000)
        } else {
          setStatus('error')
          setMessage(result.message)
        }
      }).catch((error) => {
        setStatus('error')
        setMessage('An unexpected error occurred. Please try again.')
        console.error('Verification error:', error)
      })
    } else {
      setStatus('error')
      setMessage('Invalid verification link.')
    }
  }, [token, router])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="bg-bg-card p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-text">Email Confirmation</h1>
        
        {status === 'verifying' && (
          <div>
            <p className="mb-4">We're verifying your email address...</p>
            <div className="loader mx-auto"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="success-message">
            <p className="">{message}</p>
            <p className="mt-2">Redirecting to login...</p>
          </div>
        )}
        
        {status === 'alreadyVerified' && (
          <div className="success-message">
            <p className="">{message}</p>
            <p className="mt-2">Redirecting to login...</p>
          </div>
        )}
        
        {status === 'error' && (
          <p className="text-red-500">{message}</p>
        )}
      </div>
    </div>
  )
}