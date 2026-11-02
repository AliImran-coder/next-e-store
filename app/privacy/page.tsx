"use client";

import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  Database,
  Cookie,
} from "lucide-react";

const sections = [
  
  {
    icon: UserRound,
    title: "Information We Collect",
    text: "We may collect information you provide when creating an account, placing an order, or contacting our support team, such as your name, email address, delivery details, and order information.",
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    text: "Your information may be used to process orders, manage your account, provide customer support, improve our store, and communicate important updates about your purchases.",
  },
  {
    icon: LockKeyhole,
    title: "Data Protection",
    text: "We take reasonable steps to protect customer information against unauthorized access, loss, misuse, or disclosure. However, no online system can guarantee absolute security.",
  },
  {
    icon: Cookie,
    title: "Cookies and Website Usage",
    text: "Our website may use cookies or similar technologies to support essential features, remember preferences, and understand how visitors use the store.",
  },
  {
    icon: ShieldCheck,
    title: "Your Privacy Choices",
    text: "You may contact the store to ask about your personal information or request an update or deletion where applicable under relevant laws.",
  },
];

function PrivacyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-red-100 px-3 py-8 sm:px-6 sm:py-12">
      <article className="w-full max-w-3xl rounded-2xl border border-red-200 bg-red-200 p-4 shadow-lg sm:p-7 md:p-10">
        
        <h1 className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 rounded-lg border border-gray-600 px-4 py-3 text-center text-2xl font-bold text-gray-900 sm:gap-3 sm:px-8 sm:text-3xl">
          <ShieldCheck className="h-6 w-6 shrink-0 sm:h-[26px] sm:w-[26px]" />
          <u>Privacy Policy</u>
        </h1>

        <p className="mt-3 text-center text-sm text-gray-800 sm:text-base">
          Your privacy matters to us.
        </p>

        
        <p className="mt-5 rounded-xl bg-red-100 p-3 text-sm leading-6 text-gray-800 sm:mt-6 sm:p-4 sm:text-base">
          This policy describes how our store may collect, use, and protect
          your information when you visit our website or make a purchase.
          Adapt this policy to match your actual business practices before
          publishing it.
        </p>

        
        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="flex min-w-0 items-start gap-3 rounded-xl border border-gray-500 p-3 transition duration-200 hover:border-emerald-400  sm:gap-4 sm:p-5"
              >
                
                <div className="shrink-0 rounded-lg bg-red-100 p-2.5 text-black sm:p-3">
                  <Icon className="h-5 w-5 sm:h-[23px] sm:w-[23px]" />
                </div>

                
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-semibold text-gray-900 sm:text-base">
                    {section.title}
                  </h2>

                  <p className="mt-2 break-words text-sm leading-6 text-gray-700">
                    {section.text}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}

export default PrivacyPage;