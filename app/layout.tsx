
import { DM_Sans, Raleway } from "next/font/google";

import "leaflet/dist/leaflet.css";
import ReduxProvider from "@/redux/Provider";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/CondtionalFooter";
import Chatbot from "@/components/Chatbot";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${raleway.variable}`}
    >
      <body className={dmSans.className}>
        <ReduxProvider>
          <ConditionalNavbar />
          {children}
          <ConditionalFooter />
          <Chatbot />
        </ReduxProvider>
      </body>
    </html>
  );
}
