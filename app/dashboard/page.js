import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongoose";
import Dashboard from "@/components/Dashboard";
import User from "@/models/User";
import Link from "@/models/Link";
import LinkComponent from "next/link";

export default async function DashboardPage(){
    const session = await getServerSession(authOptions)
    await connectDB()
    if(!session){
    return <div className="text-center font-bold text-2xl mt-20">Please <LinkComponent href="/login" className="text-blue-600">Login</LinkComponent> to see your Dashboard</div>
    }
    const user = await User.findOne({email: session.user.email}) 
    if(!user){
        return <div>User not found.</div>
    }

    const links = await Link.find({user: user._id}).lean();
    return <Dashboard links={JSON.parse(JSON.stringify(links))} />

}