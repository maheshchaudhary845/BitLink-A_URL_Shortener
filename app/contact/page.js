"use client"
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("/api/contact", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Message sent!")
            setIsLoading(false)
            setForm({ name: "", email: "", message: "" })
        }
        else {
            toast.error("Failed to send message.")
        }
    }

    return (
        <main className="max-w-xl mx-auto px-6 py-12">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-6">Contact</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="w-full border px-4 py-2 rounded"
                />
                <textarea
                    value={form.message}
                    onChange={handleChange}
                    name="message"
                    placeholder="Your Message"
                    className="w-full border px-4 py-2 rounded h-32"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 opacity-100" disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Message"}
                </button>

            </form>
            <div className="mt-8 text-gray-600">
                Or reach me directly at: <br />
                📧 bitlinkhq@gmail.com <br />
                🐙 <a href="https://github.com/maheshchaudhary845" className="text-blue-600 underline">GitHub Profile</a>
            </div>
        </main>
    );
}
