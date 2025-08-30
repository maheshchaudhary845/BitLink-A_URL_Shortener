import { QRCodeSVG } from "qrcode.react";

const Dashboard = ({ links }) => {
  return (
    <main className="min-h-screen p-4">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-800 mb-8">
          Your BitLinks
        </h1>

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-cyan-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Original URL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Shortened URL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Clicks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">QR Code</th>
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
                    <td className="px-4 py-3 text-sm text-gray-700 break-all">{link.longUrl}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">
                      <a href={`/api/r/${link.shortUrl}`} target="_blank" rel="noopener noreferrer" className="underline">
                        {link.shortUrl}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{link.clicks || 0}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      {/* Placeholder for QR code */}
                      <QRCodeSVG
                        value={`/api/r/${link.shortUrl}`}
                        size={60}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="mt-2"
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
};

export default Dashboard;
