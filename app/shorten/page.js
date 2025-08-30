"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Shorten = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [generated, setGenerated] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tempUrl, setTempUrl] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [session, router]);

    const generate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTempUrl(shortUrl);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            longUrl,
            shortUrl,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`/api/generate/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false);
                if (result.success) {
                    toast.success("URL Generated Successfully!");
                    setGenerated("true");
                    setLongUrl("");
                    setShortUrl("");
                } else {
                    toast.error("URL not Generated!");
                    setGenerated("false");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <main className="min-h-screen px-4 py-6 bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <div className="flex flex-col items-center gap-3 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">
                        Shorten Your Link
                    </h1>
                    <p className="text-gray-700 text-center text-sm sm:text-base">
                        Paste your long URL and get a custom short link instantly.
                    </p>
                </div>

                <form onSubmit={generate} className="space-y-6">
                    <div>
                        <label htmlFor="longurl" className="block text-gray-700 mb-1 text-sm sm:text-base">
                            Long URL
                        </label>
                        <input
                            type="url"
                            id="longurl"
                            required
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            placeholder="https://www.example.com/very/long/url"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="shorturl" className="block text-gray-700 mb-1 text-sm sm:text-base">
                            Custom Short URL
                        </label>
                        <div className="flex flex-col sm:flex-row">
                            <span className="inline-flex items-center px-3 py-3 text-gray-500 border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none shadow-sm text-sm sm:text-base">
                                {process.env.NEXT_PUBLIC_HOST}/
                            </span>
                            <input
                                type="text"
                                id="shorturl"
                                value={shortUrl}
                                required
                                onChange={(e) => setShortUrl(e.target.value)}
                                placeholder="short-url"
                                className="w-full px-4 py-3 border border-gray-300 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 text-sm sm:text-base"
                    >
                        {isLoading ? "Generating..." : "Generate Short URL"}
                    </button>
                </form>

                {generated === "true" && (
                    <div className="flex justify-center items-center bg-sky-100 rounded-xl p-4 mt-6 text-sm sm:text-base text-center">
                        <div>
                            Your Short URL is{" "}
                            <Link
                                href={`${process.env.NEXT_PUBLIC_HOST}/${tempUrl}`}
                                target="_blank"
                                className="text-blue-700 underline break-words"
                            >
                                {process.env.NEXT_PUBLIC_HOST}/{tempUrl}
                            </Link>
                        </div>
                    </div>
                )}

                {generated === "false" && (
                    <div className="flex justify-center items-center bg-red-100 rounded-xl p-4 mt-6 text-sm sm:text-base text-center text-red-700">
                        <div>
                            Sorry, URL <strong>{process.env.NEXT_PUBLIC_HOST}/{tempUrl}</strong> is already taken by another user.
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </main>
    );
};

export default Shorten;
