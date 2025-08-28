export async function POST(request) {
    try {
        const body = await request.json()
        const client = await clientPromise
        const db = client.db("bitlink")
        const collection = db.collection("url")

        const doc = await collection.findOne({ shortUrl: body.shortUrl })
        if (doc) {
            return Response.json({ success: false, error: true, message: "URL already exists!" })
        }

        await collection.insertOne({
            longUrl: body.longUrl,
            shortUrl: body.shortUrl
        })

        return Response.json({
            success: true,
            error: false,
            message: "URL Generated Successfully",
            shortUrl: body.shortUrl
        })
    } catch (err) {
        console.error("API Error:", err)
        return Response.json({ success: false, error: true, message: "Server error" })
    }
}
