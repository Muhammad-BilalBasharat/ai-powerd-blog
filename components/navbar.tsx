"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Separator } from "@/components/ui/separator"

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/newsletter", label: "Newsletter" },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

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
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full hover:bg-white/10"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-secondary text-white text-xl">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <span className="text-xs text-muted-foreground mt-1">
                          Role: {user.role}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                      <div className="flex items-center px-3 py-2 text-sm">
                        <Mail className="mr-2 h-4 w-4" />
                        <span className={user.isVerified ? "text-green-600" : "text-yellow-600"}>
                          {user.isVerified ? "Email Verified" : "Email Not Verified"}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href="/login">
                <Button className="bg-secondary hover:bg-tertiary text-white rounded-xl">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
