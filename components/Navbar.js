"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false)
    const path = usePathname()
    const { data: session } = useSession()
    const dropdownRef = useRef(null)
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        document.body.style.overflowX = "hidden";
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

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
                        <Link href="/features" className="text-gray-700 hover:text-blue-600 transition">
                            Features
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex gap-2 items-center">
                        {!path.includes("/shorten") && !session &&
                            <div className="hidden md:flex">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                                >
                                    Start Free
                                </Link>
                            </div>
                        }
                        <div className={`fixed inset-0 z-0 backdrop-blur-[0.5px] bg-black/5 transition-opacity duration-200 ${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        </div>
                        {session &&
                            <div className="md:flex gap-2" ref={dropdownRef}>
                                <div onClick={() => setShowDropdown(!showDropdown)} className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                                    <Image src={session.user.image} fill alt="profile img" />
                                </div>
                                {hasMounted && <div className={`absolute z-10 top-0 right-0 ${showDropdown ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"} transition-all duration-200 ease-in min-w-80 flex flex-col bg-white p-4 shadow-lg rounded-lg`}>
                                    <div className="flex gap-3 items-center">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                                            <Image src={session.user.image} fill alt="profile img" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium">{session.user.email}</div>
                                            <div className="text-sm text-gray-600 font-light">{session.user.name}</div>
                                        </div>
                                        <div onClick={() => setShowDropdown(false)} className="p-2 cursor-pointer hover:bg-gray-100 rounded-sm">
                                            <svg className="h-4 w-4"
                                                fill="#1D1D1D"
                                                stroke="#1D1D1D"
                                                viewBox="0 0 24 24">
                                                <path strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="separator bg-gray-700 h-[1px] w-full my-4"></div>
                                    <ul className="text-sm">
                                        <li><Link href="/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#8D8D8D" fill="none">
                                            <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>Your Profile</Link></li>
                                        <li><Link href="/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#8D8D8D"} fill={"none"}>
                                                <path d="M2.5 12C2.5 7.52167 2.5 5.2825 3.89124 3.89126C5.28249 2.50002 7.52166 2.50002 12 2.50002C16.4783 2.50002 18.7175 2.50002 20.1088 3.89126C21.5 5.2825 21.5 7.52167 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12Z" stroke="#8D8D8D" strokeWidth="2"></path>
                                                <path d="M2.5 9.00002H21.5" stroke="#8D8D8D" strokeWidth="2" strokeLinejoin="round"></path>
                                                <path d="M6.99981 6.00002H7.00879" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M10.9998 6.00002H11.0088" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M17 17C17 14.2386 14.7614 12 12 12C9.23858 12 7 14.2386 7 17" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round"></path>
                                                <path d="M12.707 15.293L11.2928 16.7072" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            Dashboard</Link></li>

                                        <li><Link href="#signout" onClick={() => { signOut(); setShowDropdown(false) }} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#8D8D8D" fill="none">
                                            <path d="M14.5 6C14.4534 4.90658 14.3147 4.20985 13.9025 3.67376C13.7426 3.46574 13.5561 3.27954 13.3476 3.11992C12.5381 2.5 11.363 2.5 9.01286 2.5H8.51184C5.67786 2.5 4.26087 2.5 3.38046 3.37867C2.50006 4.25734 2.50004 5.67157 2.50003 8.49997L2.50002 15.5C2.50001 18.3284 2.5 19.7426 3.38042 20.6213C4.26083 21.5 5.67783 21.5 8.51184 21.5H9.01281C11.363 21.5 12.5381 21.5 13.3476 20.8801C13.556 20.7205 13.7426 20.5343 13.9025 20.3263C14.3147 19.7901 14.4534 19.0933 14.5 17.9996" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M20.5 11.9999H8.50002M18 15.5C18 15.5 21.5 12.9223 21.5 12C21.5 11.0777 18 8.5 18 8.5" stroke="#8D8D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>Sign out</Link></li>
                                    </ul>
                                </div>
                                }
                            </div>
                        }


                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex gap-2 items-center">
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
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-gray-200">
                    <Link href="/" className="block text-gray-700 hover:text-blue-600 transition pt-2">
                        Home
                    </Link>
                    <Link href="/features" className="block text-gray-700 hover:text-blue-600 transition">
                        Features
                    </Link>
                    <Link href="/about" className="block text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link href="/contact" className="block text-gray-700 hover:text-blue-600 transition pb-2">
                        Contact
                    </Link>
                    {!path.includes("/shorten") && !session && <Link
                        href="/login"
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