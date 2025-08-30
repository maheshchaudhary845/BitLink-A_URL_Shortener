import connectDB from "@/lib/mongoose";
import Link from "@/models/Link";

export async function GET(req, {params}){
    await connectDB();
    const {slug} = params;
    const link = await Link.findOne({shortUrl: slug});
    if(!link){
        return new Response("Link not found", {status: 404})
    }

    // increment click
    link.clicks += 1;
    await link.save();

    return Response.redirect(link.longUrl);
}