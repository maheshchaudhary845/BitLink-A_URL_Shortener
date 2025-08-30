import Link from "next/link";

export default function HowItWorks() {
    return (
        <main>
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-cyan-800 mb-4">
                        How BitLink Works
                    </h1>
                    <p className="text-lg text-gray-600 mb-12">
                        BitLink makes shortening URLs fast, flexible, and 100% free — with the option to create your own custom short links.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Step 1 */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Step 1: Paste Your Long URL</h2>
                        <p className="text-gray-700">
                            Drop your lengthy link into the input field. No login, no limits — just instant access.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Step 2: Customize Your Short URL</h2>
                        <p className="text-gray-700">
                            Type your own alias after bitlink.xyz/ <code className="bg-gray-100 px-2 py-1 rounded">mybrand</code>.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Step 3: Click “Generate Short URL”</h2>
                        <p className="text-gray-700">
                            Hit the button and BitLink instantly creates your short link — fast, clean, and ready to share.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Step 4: Share Anywhere</h2>
                        <p className="text-gray-700">
                            Copy your new short link and share it across social media, emails, or chats. It’s yours forever.
                        </p>
                    </div>

                </div>
                <div className="mt-16 text-center">
                    <Link
                        href="/shorten"
                        className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition"
                    >
                        Try It Now — Free Forever
                    </Link>
                </div>
            </section>
        </main>
    );
}
