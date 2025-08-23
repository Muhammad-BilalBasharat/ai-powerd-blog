import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Blog Info */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Our Blog</h3>
            <p className="text-white mb-4 leading-relaxed">
              Sharing insights, stories, and knowledge on topics that matter. Join our community of readers and stay
              updated with our latest posts.
            </p>
            <Link href="/newsletter" className="text-white hover:underline transition-colors">
                  Subscribe to our newsletter for weekly update.
                </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white text-sm hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white text-sm hover:underline transition-colors">
                 Post
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white text-sm hover:underline transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-white text-sm hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white text-sm hover:underline transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            <li>
                <Link href="/newsletter" className="text-white text-sm hover:underline transition-colors">
                 Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white">© {currentYear} Bee. All rights reserved.</p>
           
          <div className="flex justify-between gap-2">
             <p className="text-sm text-white/80">
                Built with ❤️ using Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
