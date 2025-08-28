import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

const Page = async (props)=>{
    const client = await clientPromise
    const db = client.db("bitlink")
    const collection = db.collection("url")

    const params = await props.params
    const shorturl = params.shorturl

    const result = await collection.findOne({shortUrl: shorturl})
    if(result){
        const url = result.longUrl
        return redirect(url)
    }
    else{
        return notFound()
    }
    
}

export default Page;