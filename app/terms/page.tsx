"use client";

import {
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCw,
  Scale,
} from "lucide-react";


const terms = [
  {
    icon: ShoppingBag,
    title: "Orders and Products",
    text: "Product descriptions, images, prices, and stock information are provided to help you make purchasing decisions. An order may be subject to confirmation and product availability.",
  },
  {
    icon: CreditCard,
    title: "Prices and Payments",
    text: "Prices and any applicable charges should be displayed before checkout. Customers must provide accurate billing information and use an accepted payment method.",
  },
  {
    icon: Truck,
    title: "Shipping and Delivery",
    text: "Delivery estimates are provided for guidance and may change because of stock availability, courier delays, weather, or other circumstances outside the store's control.",
  },
  {
    icon: RefreshCw,
    title: "Returns and Refunds",
    text: "Returns, exchanges, cancellations, and refunds are handled according to the store's published return policy and applicable consumer protection laws.",
  },
  {
    icon: Scale,
    title: "Website Use",
    text: "You agree to use the website lawfully, provide accurate information, and avoid activities that could disrupt the store, compromise its security, or interfere with other users.",
  },
];

function TermsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-red-100 px-3 py-8 sm:px-6 sm:py-12">
      <article className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-red-200 p-4 shadow-lg sm:p-7 md:p-10">

        
        <h1 className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 rounded-lg border border-gray-600 px-3 py-3 text-center text-xl font-bold text-gray-900 sm:gap-3 sm:px-6 sm:text-2xl md:px-9 md:text-3xl">
          <FileText className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          <u>Terms &amp; Conditions</u>
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-gray-900 sm:text-base">
          Please read these terms before using our store.
        </p>
        
        
        
        <p className="mt-5 rounded-xl bg-red-100 p-3 text-sm leading-6 text-gray-900 sm:mt-6 sm:p-4 sm:text-base">
          These terms provide a starting point for explaining the rules of
          using an online store and purchasing products. Customize them to
          reflect your business and legal obligations.
        </p>

        
        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {terms.map((term) => {
            const Icon = term.icon;

            return (
              <section
                key={term.title}
                className="flex min-w-0 items-start gap-3 rounded-xl border border-gray-500 p-3 transition duration-200 hover:border-violet-300  sm:gap-4 sm:p-5"
              >
                
                <div className="h-fit shrink-0 rounded-lg bg-red-100 p-2.5 text-violet-500 sm:p-3">
                  <Icon className="h-5 w-5 sm:h-[23px] sm:w-[23px]" />
                </div>

                
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-semibold text-gray-900 sm:text-base">
                    {term.title}
                  </h2>

                  <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                    {term.text}
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

export default TermsPage;