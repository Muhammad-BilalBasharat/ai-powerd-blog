"use client"
export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this blog website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Permission is granted to temporarily download one copy of the materials on this blog for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                  <li>attempt to decompile or reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated 
                  by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, 
                  you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
                </p>
                <p>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware 
                  of any breach of security or unauthorized use of your account.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content Guidelines</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>Our blog aims to provide valuable, educational, and entertaining content. When interacting with our content, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide constructive and respectful comments</li>
                  <li>Not post spam, promotional content, or irrelevant material</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in harassment, hate speech, or discriminatory behavior</li>
                  <li>Not post content that is illegal, harmful, or offensive</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                The content, organization, graphics, design, compilation, magnetic translation, digital conversion, 
                and other matters related to the blog are protected under applicable copyrights, trademarks, and other 
                proprietary rights. All content on this blog is the property of the blog owner or its content suppliers 
                and is protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy, 
                which is incorporated into these Terms by reference. By using our service, you consent to the collection and use 
                of your information as outlined in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  The materials on this blog are provided on an 'as is' basis. We make no warranties, expressed or implied, 
                  and hereby disclaim and negate all other warranties including without limitation, implied warranties or 
                  conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
                  or other violation of rights.
                </p>
                <p>
                  Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability 
                  of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitations</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall the blog owner or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                the materials on this blog, even if the blog owner or an authorized representative has been notified orally or 
                in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied 
                warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Accuracy of Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials appearing on this blog could include technical, typographical, or photographic errors. 
                We do not warrant that any of the materials on its website are accurate, complete, or current. 
                We may make changes to the materials contained on its website at any time without notice. 
                However, we do not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Links</h2>
              <p className="text-gray-700 leading-relaxed">
                We have not reviewed all of the sites linked to our blog and are not responsible for the contents of any such linked site. 
                The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                We may revise these terms of service for its website at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
                submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach 
                of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul className="list-none space-y-2 ml-4">
                  <li>• Email: support@yourblog.com</li>
                  <li>• Address: [Your Business Address]</li>
                  <li>• Phone: [Your Contact Number]</li>
                </ul>
              </div>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 italic">
                <strong>Note:</strong> This is a template for terms and conditions. Please consult with a legal professional 
                to ensure these terms meet your specific needs and comply with applicable laws in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}