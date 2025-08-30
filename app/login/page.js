"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LoginPage = () => {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if(session) {
            router.push("/shorten")
        }
    }, [session, router])

    return (
        <main>
            <section>
                <div className="max-w-sm mx-auto mt-30 p-4 space-y-2">
                    <button onClick={() => signIn("google")} className="w-full bg-red-600 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700">Sign in with Google</button>
                    <button onClick={() => signIn("github")} className="w-full bg-slate-600 p-2 rounded-lg text-white cursor-pointer hover:bg-slate-700">Sign in with GitHub</button>
                </div>
            </section>
        </main>
    )
}

export default LoginPage;