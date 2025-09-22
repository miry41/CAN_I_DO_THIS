"use client";

import Header from "@/components/Header";
import BannerAd from "@/components/BannerAd";
import { MobileLayout, MobileContainer, MobileCard } from "@/components/mobile";
import { ErrorProvider, useError } from "@/components/providers";
import { useContactForm, parseApiError } from "@/hooks";
import { ContactFormData, SubmitStatus } from "@/types";

function ContactContent() {
  const { formData, isSubmitting, submitStatus, handleChange, submitForm } =
    useContactForm();
  const { showSuccess, showSimpleError } = useError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm("/api/contact");
      showSuccess(
        "メッセージが正常に送信されました。ありがとうございます！",
        "送信完了"
      );
    } catch (error) {
      // エラーハンドリングをモーダルに変更
      const { title, message, details } = parseApiError(error);
      showSimpleError(message, title);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <MobileLayout>
          <MobileContainer maxWidth="max-w-4xl">
            <MobileCard className="p-8">
              <h1 className="text-3xl font-bold text-wisteria-900 mb-6">
                Contact Us
              </h1>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-wisteria-900 mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-wisteria-700 mb-6">
                    Have questions about CAN_I_DO_THIS?? or need support?
                    We&apos;d love to hear from you. Send us a message and
                    we&apos;ll respond as soon as possible.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-wisteria-500 to-wisteria-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-wisteria-900">Email</p>
                        <p className="text-wisteria-600">
                          dionaeatech@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-wisteria-400 to-wisteria-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-wisteria-900">
                          Response Time
                        </p>
                        <p className="text-wisteria-600">
                          Within 3 business days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-wisteria-700 mb-1"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-wisteria-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wisteria-500 focus:border-transparent text-wisteria-900"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-wisteria-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-wisteria-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wisteria-500 focus:border-transparent text-wisteria-900"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-wisteria-700 mb-1"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-wisteria-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wisteria-500 focus:border-transparent text-wisteria-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="privacy">Privacy Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-wisteria-700 mb-1"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-wisteria-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wisteria-500 focus:border-transparent text-wisteria-900"
                        placeholder="Please describe your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-wisteria-500 to-wisteria-600 text-white py-3 px-6 rounded-lg font-medium hover:from-wisteria-600 hover:to-wisteria-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800">
                          Thank you! Your message has been sent successfully.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">
                          Sorry, there was an error sending your message. Please
                          try again.
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </MobileCard>
          </MobileContainer>
        </MobileLayout>
      </main>
      <BannerAd />
    </div>
  );
}

export default function Contact() {
  return (
    <ErrorProvider>
      <ContactContent />
    </ErrorProvider>
  );
}
