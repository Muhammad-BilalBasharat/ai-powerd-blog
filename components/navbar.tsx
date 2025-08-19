"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/newsletter", label: "Newsletter" },
  ]
  return (
    <>
    <nav>
        <div className="flex items-center justify-between p-4 bg-primary text-white shadow-2xl">
            <div className="text-lg font-bold uppercase">Bee.</div>
            <div className="space-x-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase text-sm transition-all ${
                  pathname === link.href
                    ? "underline underline-offset-6 font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            </div>
            <div className="flex items-center space-x-2">
                <Link href="/login"><Button className="bg-secondary hover:bg-tertiary text-white rounded-xl">LOGIN</Button></Link>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar