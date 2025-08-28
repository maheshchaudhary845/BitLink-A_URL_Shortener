export default function FeaturesPage() {
  const features = [
    {
      title: "Custom Short URLs",
      description: "Create memorable links that reflect your brand or message.",
    },
    {
      title: "Instant Generation",
      description: "Paste, customize, and shorten in seconds.",
    },
    {
      title: "MongoDB Storage",
      description: "Your links are safely stored and retrievable anytime.",
    },
    {
      title: "Responsive Design",
      description: "Works beautifully on mobile, tablet, and desktop.",
    },
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
