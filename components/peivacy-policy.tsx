import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = "August 15, 2025";
  const companyName = "Bee. Inc.";
  const contactEmail = "privacy@bee.com";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            {/* Header */}
            <div className="border-b border-gray-200 pb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="mt-8 mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Table of Contents
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#information-we-collect" className="text-blue-600 hover:text-blue-800 hover:underline">
                    1. Information We Collect
                  </a>
                </li>
                <li>
                  <a href="#how-we-use" className="text-blue-600 hover:text-blue-800 hover:underline">
                    2. How We Use Your Information
                  </a>
                </li>
                <li>
                  <a href="#data-sharing" className="text-blue-600 hover:text-blue-800 hover:underline">
                    3. Data Sharing and Disclosure
                  </a>
                </li>
                <li>
                  <a href="#data-security" className="text-blue-600 hover:text-blue-800 hover:underline">
                    4. Data Security
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className="text-blue-600 hover:text-blue-800 hover:underline">
                    5. Your Rights
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-blue-600 hover:text-blue-800 hover:underline">
                    6. Cookies and Tracking
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-blue-600 hover:text-blue-800 hover:underline">
                    7. Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            {/* Content Sections */}
            <div className="space-y-10 text-gray-700">
              {/* Introduction */}
              <section>
                <p className="leading-relaxed">
                  At {companyName}, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our website and services. 
                  Please read this privacy policy carefully.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Personal Information
                    </h3>
                    <p className="leading-relaxed">
                      We may collect personal information that you provide directly to us, such as:
                    </p>
                    <ul className="mt-2 ml-6 list-disc space-y-1">
                      <li>Name and contact information</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Billing and shipping address</li>
                      <li>Payment information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="leading-relaxed">
                      When you visit our website, we automatically collect certain information about your device, including:
                    </p>
                    <ul className="mt-2 ml-6 list-disc space-y-1">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Referring website</li>
                      <li>Pages visited and time spent</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-3">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To process transactions and send related information</li>
                  <li>To send administrative information and updates</li>
                  <li>To respond to your comments and questions</li>
                  <li>To improve our website and services</li>
                  <li>To send marketing and promotional communications (with your consent)</li>
                  <li>To detect and prevent fraud and abuse</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Data Sharing and Disclosure
                </h2>
                <p className="leading-relaxed mb-3">
                  We may share your information in the following circumstances:
                </p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Service Providers</h4>
                    <p className="text-sm">
                      We may share your information with third-party service providers who perform services on our behalf.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Legal Requirements</h4>
                    <p className="text-sm">
                      We may disclose your information if required by law or in response to valid legal requests.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Business Transfers</h4>
                    <p className="text-sm">
                      Your information may be transferred in connection with a merger, acquisition, or sale of assets.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                  of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
                  absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Your Rights
                </h2>
                <p className="leading-relaxed mb-3">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Access & Portability</h4>
                    <p className="text-sm text-gray-600">
                      Request access to your personal data and receive it in a portable format
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Correction</h4>
                    <p className="text-sm text-gray-600">
                      Request correction of inaccurate or incomplete personal data
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Deletion</h4>
                    <p className="text-sm text-gray-600">
                      Request deletion of your personal data under certain circumstances
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Opt-Out</h4>
                    <p className="text-sm text-gray-600">
                      Opt-out of marketing communications at any time
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain 
                  information. Cookies are files with a small amount of data that are sent to your browser from a 
                  website and stored on your device. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Contact Us
                </h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="font-medium text-gray-900">{companyName}</p>
                  <p className="text-gray-700 mt-1">
                    Email: <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-800">
                      {contactEmail}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    Address: 123 Main Street, Suite 100, City, State 12345
                  </p>
                  <p className="text-gray-700">
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </section>

              {/* Updates Notice */}
              <section className="border-t border-gray-200 pt-8 mt-12">
                <p className="text-sm text-gray-600 text-center">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;