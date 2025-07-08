'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage(){

    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/login', {email, password, isAdmin})
        if(response.data.message === "success") {
            localStorage.setItem('isLoggedIn', 'true')
            if (isAdmin) {
                router.push('/admin') 
            } else {
                router.push('/')
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
           <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl text-center font-bold mb-6">Login</h1>
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

                <div className="mb-6 flex items-center">
                    <input
                        type="checkbox"
                        id="adminCheckbox"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                        className="mr-2"
                    />
                    <label htmlFor="adminCheckbox" className="text-gray-700 cursor-pointer">
                        Login as an Admin
                    </label>
                </div>

                <button type="submit" className="w-full bg-black text-white py-2 rounded transition">Login</button>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <span
                        onClick={() => router.push('/signup')}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
           </form> 
        </div>
    )
}