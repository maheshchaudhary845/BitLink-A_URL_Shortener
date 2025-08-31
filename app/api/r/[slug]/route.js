import connectDB from "@/lib/mongoose";
import Link from "@/models/Link";

export async function GET(req, props) {
  await connectDB();
  const params = await props.params;
  const slug = params.slug;

  const link = await Link.findOne({ shortUrl: slug });
  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|preview/i.test(userAgent);

  if (!isBot) {
    link.clicks += 1;
    await link.save();
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: link.longUrl,
    },
  });
}
