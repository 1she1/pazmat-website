'use client'
import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/admin') // Send to admin page if successful
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  )
}