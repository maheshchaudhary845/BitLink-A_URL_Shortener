import clientPromise from "@/lib/mongodb";

export async function POST(request){
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bitlink")
    const collection = db.collection("url")

    // check if the short URL exists
    const doc = await collection.findOne({shortUrl: body.shortUrl})
    if(doc){
        return Response.json({success: false, error: true, message: "URL already exists!"})
    }

    const result = await collection.insertOne({
        longUrl: body.longUrl,
        shortUrl: body.shortUrl
    })
    
    return Response.json({success: true, error: false, message: "URL Generated Successfully"})
}