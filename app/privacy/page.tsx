"use client";

import Header from "@/components/Header";
import BannerAd from "@/components/BannerAd";

export default function Privacy() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-safe">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Privacy Policy
              </h1>

              <div className="space-y-6 text-gray-700">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    1. Information We Collect
                  </h2>
                  <p className="mb-3">
                    When you use CAN_I_DO_THIS??, we may collect the following
                    information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Text content you submit for analysis</li>
                    <li>URLs you provide for analysis</li>
                    <li>Usage data and analytics</li>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>User interaction data with our service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    2. Cookies and Similar Technologies
                  </h2>
                  <p className="mb-3">
                    We use cookies and similar tracking technologies to enhance
                    your experience on our website. These technologies help us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Improve our service functionality</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  <p className="mt-3">
                    You can control cookie settings through your browser
                    preferences. However, disabling certain cookies may affect
                    the functionality of our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    3. How We Use Your Information
                  </h2>
                  <p className="mb-3">We use the collected information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide AI-powered problem analysis services</li>
                    <li>Improve our service and user experience</li>
                    <li>Generate knowledge graphs and visualizations</li>
                    <li>Ensure service security and prevent abuse</li>
                    <li>Display personalized advertisements</li>
                    <li>Analyze user behavior and preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    4. Third-Party Services and Advertising
                  </h2>
                  <p className="mb-3">
                    Our website uses third-party services and advertising
                    networks, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Google AdSense:</strong> We use Google AdSense to
                      display advertisements on our website. Google AdSense may
                      collect and process data including your IP address,
                      browser type, and browsing behavior to provide
                      personalized advertisements. You can learn more about how
                      Google uses your data by visiting{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google&apos;s Privacy Policy
                      </a>
                      .
                    </li>
                    <li>
                      <strong>Google Gemini AI:</strong> We use Google Gemini AI
                      for analysis processing. Please refer to{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google&apos;s Privacy Policy
                      </a>{" "}
                      for information about how they handle your data.
                    </li>
                  </ul>
                  <p className="mt-3">
                    These third-party services may use cookies and similar
                    technologies to collect information about your browsing
                    activities across different websites and over time.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    5. Data Security
                  </h2>
                  <p>
                    We implement appropriate security measures to protect your
                    information. Your data is processed securely and we do not
                    share your personal information with third parties without
                    your consent, except as described in this privacy policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    6. Data Retention
                  </h2>
                  <p>
                    Analysis results are stored temporarily in your browser
                    session. We do not permanently store your analysis data on
                    our servers. However, some data may be retained for
                    analytics and advertising purposes as described in this
                    policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    7. Your Rights
                  </h2>
                  <p>
                    You have the right to access, correct, or delete your
                    personal information. You can also opt out of personalized
                    advertising by visiting the{" "}
                    <a
                      href="https://adssettings.google.com/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Ad Settings
                    </a>
                    . Contact us if you have any questions about your data.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    8. Changes to This Policy
                  </h2>
                  <p>
                    We may update this privacy policy from time to time. We will
                    notify users of any material changes to this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    9. Contact Us
                  </h2>
                  <p>
                    If you have any questions about this privacy policy, please
                    contact us through our contact page.
                  </p>
                </section>

                <div className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-200">
                  <p>Last updated: August 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BannerAd />
    </div>
  );
}
