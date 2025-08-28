"use client"
import Link from "next/link";
import { useState } from "react";

const Shorten = () => {
    const [longUrl, setLongUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [generated, setGenerated] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [tempUrl, setTempUrl] = useState("")

    const generate = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setTempUrl(shortUrl)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "longUrl": longUrl,
            "shortUrl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`/api/generate/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if(result.success){
                    setGenerated("true")
                    setLongUrl("")
                    setShortUrl("")
                    setTempUrl(result.shortUrl)
                }
                else{
                    setGenerated("false")
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <main>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg my-10 p-8">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-2xl font-bold text-center">Shorten Your Link</h1>
                    <p className="text-gray-700 text-center">Paste your long URL and get a custom short link instantly.</p>
                </div>
                <form onSubmit={generate} className="space-y-6">
                    <div>
                        <label htmlFor="longurl" className="block text-gray-700 mb-1">Long URL</label>
                        <input type="url" id="longurl" required value={longUrl} onChange={(e) => { setLongUrl(e.target.value) }} placeholder="https://www.example.com/very/long/url" className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="shorturl" className="block text-gray-700 mb-1">Custom Short URL</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-gray-500 rounded-l-lg border-r-0 border border-gray-300 shadow-sm">{process.env.NEXT_PUBLIC_HOST}/</span>
                            <input type="text" id="shorturl" value={shortUrl} required onChange={(e) => { setShortUrl(e.target.value) }} placeholder="short-url" className="w-full px-4 py-3 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " />
                        </div>
                    </div>
                    <button type="submit" className="w-full cursor-pointer px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 opacity-100" disabled={isLoading}>{isLoading ? "Generating..." : "Generate Short URL"}</button>
                </form>
                {generated==="true" && <>
                    <div className="flex justify-center items-center bg-sky-200 rounded-xl p-5 mt-4">
                        <div>Your Short URL is <Link href={`${process.env.NEXT_PUBLIC_HOST}/${tempUrl}`} target="_blank" className="text-blue-700">{process.env.NEXT_PUBLIC_HOST}/{tempUrl}</Link></div>
                    </div>
                </>}
                {generated==="false" && <>
                    <div className="flex justify-center items-center bg-red-200 rounded-xl p-5 mt-4">
                        <div>Sorry, URL {process.env.NEXT_PUBLIC_HOST}/{tempUrl} is already taken by some user</div>
                    </div>
                </>}
            </div>
        </main>
    )
}

export default Shorten;
