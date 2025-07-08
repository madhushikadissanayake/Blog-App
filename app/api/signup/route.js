import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/UserModels";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await ConnectDB();
        const {name, email, password} = await request.json()
        const userExistence = await User.findOne({email})
        if(userExistence) {
            return NextResponse.json({error: "user already existed"})
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashpassword
        })
        await newUser.save()

        return NextResponse.json({message: "User Registered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}