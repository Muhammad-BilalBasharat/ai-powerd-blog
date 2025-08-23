"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Mail, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Separator } from "@/components/ui/separator"

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Posts" },
    { href: "/newsletter", label: "Newsletter" },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/")
      closeMobileMenu()
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-primary text-white shadow-2xl">
        {/* Main navbar */}
        <div className="flex items-center justify-between p-4 xs:px-2 xs:py-3">
          {/* Logo */}
          <div className="text-lg font-bold xs:text-base">
            Bee.
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-4 lg:space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase text-sm transition-all hover:text-gray-200 ${
                  pathname === link.href
                    ? "underline underline-offset-6 font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth (Desktop Only) & Mobile Menu */}
          <div className="flex items-center space-x-2 xs:space-x-1">
            {/* User Profile or Login (Desktop Only) */}
            <div className="hidden md:block">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 xs:h-8 xs:w-8 rounded-full hover:bg-white/10"
                    >
                      <Avatar className="h-10 w-10 xs:h-8 xs:w-8">
                        <AvatarFallback className="bg-secondary text-white xs:text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 xs:w-72" align="end">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 xs:space-x-3">
                        <Avatar className="h-16 w-16 xs:h-12 xs:w-12">
                          <AvatarFallback className="bg-secondary text-white text-xl xs:text-base">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-lg xs:text-base">{user.name}</h3>
                          <p className="text-xs text-muted-foreground xs:text-[10px]">{user.email}</p>
                          <span className="text-xs text-muted-foreground mt-1 xs:text-[10px]">
                            Role: {user.role}
                          </span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" className="justify-start xs:text-sm xs:py-2">
                          <User className="mr-2 h-4 w-4 xs:h-3 xs:w-3" />
                          View Profile
                        </Button>
                        <div className="flex items-center px-3 py-2 text-sm xs:text-xs">
                          <Mail className="mr-2 h-4 w-4 xs:h-3 xs:w-3" />
                          <span className={user.isVerified ? "text-green-600" : "text-yellow-600"}>
                            {user.isVerified ? "Email Verified" : "Email Not Verified"}
                          </span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <Button 
                        variant="destructive" 
                        className="w-full xs:text-sm xs:py-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4 xs:h-3 xs:w-3" />
                        Log out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link href="/login">
                  <Button className="bg-secondary hover:bg-tertiary text-white rounded-xl xs:text-sm xs:px-3 xs:py-2">
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden h-10 w-10 xs:h-8 xs:w-8 rounded-lg hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 xs:h-5 xs:w-5" />
              ) : (
                <Menu className="h-6 w-6 xs:h-5 xs:w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full w-80 xs:w-72 bg-primary z-50 md:hidden transform transition-transform duration-300 flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                <div className="text-lg font-bold uppercase">BEE.</div>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                  onClick={closeMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`uppercase text-sm py-4 px-2 border-b border-white/10 last:border-b-0 transition-all hover:bg-white/10 ${
                        pathname === link.href
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Section in Sidebar */}
              <div className="p-4 border-t border-white/10 flex-shrink-0">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-white text-base">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-white text-sm font-medium truncate">{user.name}</span>
                        <span className="text-white/70 text-xs truncate" title={user.email}>{user.email}</span>
                        <span className="text-white/60 text-xs">Role: {user.role}</span>
                      </div>
                    </div>
                    
                    {/* Profile Actions */}
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                      <div className="flex items-center px-3 py-2 text-sm">
                        <Mail className="mr-2 h-4 w-4 text-white/70" />
                        <span className={user.isVerified ? "text-green-300" : "text-yellow-300"}>
                          {user.isVerified ? "Email Verified" : "Email Not Verified"}
                        </span>
                      </div>
                      <Button 
                        variant="ghost"
                        className="w-full justify-start text-red-300 hover:bg-red-500/20 hover:text-red-200"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button className="w-full bg-secondary hover:bg-tertiary text-white rounded-xl">
                      LOGIN
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
}

export default Navbar