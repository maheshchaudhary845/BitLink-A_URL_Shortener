import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <span className="inline-block mb-4 px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm">
              🆓 Free Forever
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              The World&apos;s Best URL Shortener — <span className="text-green-600">100% Free</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Unlimited, lightning-fast links with zero cost. No hidden fees. No trial periods.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/shorten"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition"
              >
                Start Free
              </Link>
              <Link href="/how-it-works" className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition">
                See How It Works
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]">
              <Image
                src="/illustration.png"
                alt="BitLink - Best URL Shortener"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}