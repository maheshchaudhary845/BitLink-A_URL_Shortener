"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname()
    console.log(path)

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        {/* If you have an image logo, replace with <img /> */}
                        <span className="text-2xl font-bold text-blue-600">BitLink</span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
                            Features
                        </Link>
                        <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">
                            About
                        </Link>
                        <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition">
                            Contact
                        </Link>
                    </nav>

                    {/* Call to Action */}
                    {!path.includes("/shorten") &&
                        <div className="hidden md:flex">
                            <Link
                                href="/shorten"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                            >
                                Start Free
                            </Link>
                        </div>
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {/* Hamburger Icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12" // X icon
                                            : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-gray-200">
                    <Link href="/" className="block text-gray-700 hover:text-blue-600 transition pt-2">
                        Home
                    </Link>
                    <Link href="#features" className="block text-gray-700 hover:text-blue-600 transition">
                        Features
                    </Link>
                    <Link href="#about" className="block text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link href="#contact" className="block text-gray-700 hover:text-blue-600 transition pb-2">
                        Contact
                    </Link>
                    {!path.includes("/shorten") && <Link
                        href="/shorten"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        Start Free
                    </Link>
                    }
                </div>
            )}
        </header>
    );
}