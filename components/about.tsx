// components/ProfileSection.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import profile from "../public/Images/profile.jpg"; 
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Profile Card */}
        <Card className="bg-[#111827] border-none shadow-lg text-white">
          <CardContent className="p-6 flex flex-col items-center">
            {/* Avatar Image */}
            <div className="w-64 h-64 relative rounded-lg overflow-hidden">
              <Image
                src={profile} // Ensure this path is correct
                alt="Profie Image"
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold text-center">
              M Bilal Basharat
            </h2>
            <p className="text-sm text-gray-400 text-center">
              I&apos;m the person behind [This Blog].
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="bg-[#1e293b] px-3 py-1 text-xs rounded-full">
                Entrepreneur
              </span>
              <span className="bg-[#1e293b] px-3 py-1 text-xs rounded-full">
                Student
              </span>
              <span className="bg-[#1e293b] px-3 py-1 text-xs rounded-full">
                Content Creator
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column */}
        <div className="flex flex-col gap-6">
          {/* Professional Skills */}
          <Card className="bg-[#111827] border-none text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-secondary">
                Professional Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Web Development</li>
                <li>Mobile App Development</li>
                <li>SEO Optimization</li>
                <li>Content Creation</li>
                <li>Digital Marketing</li>
                <li>Client Handling</li>
              </ul>
            </CardContent>
          </Card>

          {/* Where I'm From */}
          <Card className="bg-[#111827] border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-secondary">
                Where I&apos;m From
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-2">
              <p>
                I am from Shakarghar, Punjab, Pakistan, and have talented people
                working with me from different cities.
              </p>
              <p>
                Shakarghar is my primary workspace, but it’s been an honour to
                work with companies and ideas across Pakistan and sometimes the
                world thereafter, resulting in incredibly convergent digital
                foundations.
              </p>
              <Link href="https://maps.google.com/" target="_blank"  className="mt-3 text-xs bg-secondary hover:bg-tertiary text-white px-4 py-2 rounded-full inline-block">
                View on map
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Follow Us */}
          <Card className="bg-[#111827] border-none text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <span className="text-lg">#</span> Follow Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">
                Follow for cool code snippets, dev tips, learnings, and new
                updates.
              </p>

              {/* Instagram */}
              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-2  px-4 py-2 bg-[#1a1f35] hover:bg-[#242b4a] transition-colors rounded-full text-sm font-medium"
              >
                <Instagram size={16} /> Instagram
              </Link>

              {/* Twitter*/}
              <Link
                href="https://x.com/"
                target="_blank"
                className="flex items-center gap-2  px-4 py-2 bg-[#1a1f35] hover:bg-[#242b4a] transition-colors rounded-full text-sm font-medium"
              >
                <Twitter size={16} /> Twitter
              </Link>
            </CardContent>
          </Card>
  {/* Our Company */}
          <Card className="bg-[#111827] border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-secondary">Our Company</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-2">
              <p>
         At Jaybee Tech Solutions, we combine power, creativity, and strength with digital experiences that will transform your business and offer you a custom online property for life web development, SEO, social media marketing, video editing, graphic designing, app development, and custom coding.
                </p>
               <Link href="https://maps.google.com/" target="_blank"  className="mt-3 text-xs bg-secondary hover:bg-tertiary text-white px-4 py-2 rounded-full inline-block">
                Visit Our Company
              </Link>
            </CardContent>
          </Card>
        
        </div>
      </div>
    </div>
  );
}
