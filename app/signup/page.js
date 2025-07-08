'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signup(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/signup', {name, email, password})
        router.push('/login')
    }

    return (
        <div className="flex justify-center items-center h-screen">
           <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl text-center font-bold mb-6">Sign Up</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your Name" 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded" 
                        required>
                    </input>
                </div>
                 <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required>
                    </input>
                </div>
                 <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                        type="password" 
                        placeholder="********" 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required>
                    </input>
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded transition">Sign Up</button>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                        onClick={() => router.push('/login')}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Login now
                    </span>
                </p>
           </form> 
        </div>
    )
}