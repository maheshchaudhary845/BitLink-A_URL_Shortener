import connectDB from "@/lib/mongoose";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import Link from "@/models/Link";

const Page = async (props)=>{
    await connectDB()

    const params = await props.params
    const shorturl = params.shorturl

    const result = await Link.findOne({shortUrl: shorturl})

    if(result){
        const url = result.longUrl
        return redirect(url)
    }
    else{
        return notFound()
    }
    
}

export default Page;