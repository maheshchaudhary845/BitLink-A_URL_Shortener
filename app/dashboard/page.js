"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [links, setLinks] = useState([]);
  const [qrSize, setQrSize] = useState(60);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 640;
      setQrSize(isMobile ? 40 : 60);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user-links")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch links");
          return res.json();
        })
        .then((data) => {
          setLinks(Array.isArray(data.links) ? data.links : []);
        })
        .catch((err) => {
          console.error("Dashboard fetch error:", err);
          setError("Something went wrong while loading your links.");
          setLinks([]);
        });
    }
  }, [status]);

  if (status === "loading") {
    return <div className="text-center mt-20 text-gray-600">Loading your dashboard...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="text-center font-bold text-2xl mt-20">
        Please <Link href="/login" className="text-blue-600">Login</Link> to see your Dashboard
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 bg-gray-50">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-cyan-800 mb-6 sm:mb-10">
          Your BitLinks
        </h1>

        {error && (
          <div className="text-center text-red-600 font-medium mb-4">
            {error}
          </div>
        )}

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {links.length === 0 ? (
            <p className="text-center text-gray-500">No links found. Start shortening!</p>
          ) : (
            links.map((link) => (
              <div key={link._id} className="bg-white border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-700 break-words">
                  <strong>Original:</strong> {link.longUrl}
                </p>
                <p className="text-sm text-gray-700 break-words">
                  <strong>Shortened:</strong>{" "}
                  <Link
                    href={`/api/r/${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    {link.shortUrl}
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Created:</strong>{" "}
                  {new Date(link.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Clicks:</strong> {link.clicks || 0}
                </p>
                <div className="mt-2 flex justify-center">
                  <QRCodeSVG value={`/api/r/${link.shortUrl}`} size={qrSize} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-cyan-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Original URL</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Shortened URL</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date Created</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Clicks</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">QR Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {links.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No links found. Start shortening!
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link._id} className="hover:bg-cyan-50 transition">
                    <td className="px-4 py-3 break-words text-gray-700">{link.longUrl}</td>
                    <td className="px-4 py-3 text-blue-600 break-words">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_HOST}/api/r/${link.shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {link.shortUrl}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {new Date(link.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{link.clicks || 0}</td>
                    <td className="px-4 py-3 text-center">
                      <QRCodeSVG
                        value={`${process.env.NEXT_PUBLIC_HOST}/api/r/${link.shortUrl}`}
                        size={qrSize}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="mt-2 mx-auto"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
