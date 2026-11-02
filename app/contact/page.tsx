"use client";

import {
    Mail,
    MessageCircle,
    Headphones,
    Clock,
} from "lucide-react";

import Link from "next/link";

function ContactPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-red-100 px-3 py-8 sm:px-6 sm:py-12">
            <section className="w-full max-w-2xl rounded-2xl border border-red-200 bg-red-200 p-4 shadow-lg sm:p-7 md:p-10">

                
                <h1 className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 rounded-lg border border-black px-4 py-2 text-center text-2xl font-bold text-gray-900 sm:gap-3 sm:px-8 sm:text-3xl">
                    <MessageCircle size={24} className="shrink-0 sm:h-[26px] sm:w-[26px]" />
                    <u>Contact Us</u>
                </h1>

                <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-gray-800 sm:text-base">
                    Have a question about an order or product? Choose one of the
                    contact options below, and we will be happy to assist you.
                </p>

                
                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">

                   
                    <a
                        href="mailto:support@estore.com"
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-700 p-3 transition duration-200 hover:border-blue-400 sm:gap-4 sm:p-4"
                    >
                        <div className="shrink-0 rounded-xl bg-red-100 p-2.5 text-black sm:p-3">
                            <Mail size={22} className="sm:h-6 sm:w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Email Support
                            </h2>

                            <p className="mt-1 break-all text-sm text-gray-800 sm:break-words">
                                support@estore.com
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-700 sm:text-sm">
                                For orders, products, and general questions
                            </p>
                        </div>
                    </a>

                    
                    <a
                        href="mailto:support@estore.com"
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-700 p-3 transition duration-200 hover:border-emerald-400  sm:gap-4 sm:p-4"
                    >
                        <div className="shrink-0 rounded-xl bg-red-100 p-2.5 text-emerald-700 sm:p-3">
                            <Headphones size={22} className="sm:h-6 sm:w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Customer Care
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-gray-800 sm:leading-6">
                                Need help with an order or delivery?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-700 sm:text-sm">
                                Contact our support team by email.
                            </p>
                        </div>
                    </a>

                    
                    <Link
                        href="/orders"
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-700 p-3 transition duration-200 hover:border-violet-400  sm:gap-4 sm:p-4"
                    >
                        <div className="shrink-0 rounded-xl bg-red-100 p-2.5 text-violet-600 transition sm:p-3">
                            <MessageCircle size={22} className="sm:h-6 sm:w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Order Assistance
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-gray-800 sm:leading-6">
                                Check your previous orders and their details.
                            </p>
                        </div>
                    </Link>
                </div>

                
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-red-100 p-3 sm:mt-6 sm:gap-4 sm:p-4">
                    <Clock
                        size={20}
                        className="mt-0.5 shrink-0 text-gray-800"
                    />

                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                            We're here to help
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-700 sm:text-sm sm:leading-6">
                            For the quickest assistance, include your order details
                            when contacting support.
                        </p>
                    </div>
                </div>

            </section>
        </main>
    );
}

export default ContactPage;