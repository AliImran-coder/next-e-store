"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import {
  ShoppingCart,
  Headset,
  MessageCircle,
  ShieldCheck,
  FileText,
  ChevronDown,
  UserRound,
  Menu,
  X,
  House,
  Package,
  KeyRound,
  CircleUserRound,
  ShieldUser,
  LogOut,
  ClipboardList,
  Keyboard,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeImage from "@/components/ThemeImage";


function Navbar() {
  const router = useRouter();
  const Pathname = usePathname();

  const [loginOptions, setLoginOptions] = useState(false);
  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const CartItems = useAppSelector((state) => state.cart.items);
  const cartCount = CartItems.length;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        setCustomerLoggedIn(Boolean(data.loggedIn));
        setCustomerName(data.customer?.name || data.name || "");
      })
      .catch(() => {
        setCustomerLoggedIn(false);
        setCustomerName("");
      });
  }, [Pathname]);

  useEffect(() => {
    setMobileMenu(false);
    setLoginOptions(false);
    setHelpOpen(false);
    setMobileHelpOpen(false);
  }, [Pathname]);

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      setCustomerLoggedIn(false);
      setLoginOptions(false);
      setMobileMenu(false);
      router.push("/");
    });
  }

  const link = (path: string) =>
    Pathname === path
      ? "flex min-w-0 items-center justify-center whitespace-nowrap rounded-lg border border-gray-300 bg-gray-600 px-3 py-2 text-sm font-semibold text-white"
      : "flex min-w-0 items-center justify-center whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-black transition hover:bg-gray-600 hover:text-white";

  function closeMenus() {
    setMobileMenu(false);
    setLoginOptions(false);
    setHelpOpen(false);
    setMobileHelpOpen(false);
  }

  const isHelpPage = ["/contact", "/privacy", "/terms",].includes(Pathname);

  const helpLinks = [
    {
      href: "/contact",
      title: "Contact Us",
      description: "We're here to help",
      icon: MessageCircle,
    },
    {
      href: "/privacy",
      title: "Privacy Policy",
      description: "Your data and privacy",
      icon: ShieldCheck,
    },
    {
      href: "/terms",
      title: "Terms & Conditions",
      description: "Read our store policies",
      icon: FileText,
    },];

  

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 shadow-md">

      <div className="relative flex min-h-20 w-full items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 lg:gap-4 lg:px-6">

        <Link
          href="/"
          onClick={closeMenus}
          aria-label="E-Store home"
          className="flex shrink-0 items-center"
        >
          <ThemeImage
            lightSrc="/logoed1.png"
            darkSrc="/logoed2.jpg"
            alt="E-Store logo"
            className="h-auto w-24 shrink-0 object-contain sm:w-24 lg:w-28"
          />
        </Link>


        <div className="hidden shrink-0 items-center gap-1 xl:flex">
          <Link href="/" className={link("/")}>
            <House size={18} className="mr-2 shrink-0" />
            Home
          </Link>

          <Link href="/products" className={link("/products")}>
            <Package size={18} className="mr-2 shrink-0" />
            Products
          </Link>

          <Link href="/orders" className={link("/orders")}>
            <ClipboardList size={18} className="mr-2 shrink-0" />
            My Orders
          </Link>



          <Link
            href="/cart"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            className={`gap-2 ${link("/cart")}`}
          >
            <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
              <ShoppingCart size={19} className="shrink-0" />

              {cartCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold leading-none text-white shadow-sm dark:border-gray-800 dark:bg-amber-300 dark:text-gray-950"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </span>

            <span>Cart</span>
          </Link>




          <div className="relative">
            <button
              type="button"
              onClick={() => setHelpOpen((previous) => !previous)}
              aria-expanded={helpOpen}
              aria-label="Help and information"
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${helpOpen || isHelpPage
                ? "border-emerald-300 bg-gray-600 text-white"
                : "border-transparent bg-gray-500 text-white hover:bg-gray-700"
                }`}
            >
              <Headset size={19} />
              Help
              <ChevronDown
                size={16}
                className={`transition-transform ${helpOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {helpOpen && (
              <div className="absolute right-0 top-full z-[60] mt-3 w-[min(18rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-gray-200 bg-white p-2 text-gray-900 shadow-xl shadow-black/15 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <p className="px-3 pb-2 pt-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Help & Information
                </p>

                {helpLinks.map((item) => {
                  const Icon = item.icon;
                  const active = Pathname === item.href;

                  return (

                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={`group flex min-w-0 items-center gap-3 rounded-lg border p-3 transition-colors duration-200 ${active
                        ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950"
                        : "border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-500 dark:hover:bg-gray-800"
                        }`}
                    >
                      <span className="shrink-0 rounded-lg bg-gray-100 p-2 text-gray-800 group-hover:bg-emerald-100 dark:bg-gray-800 dark:text-gray-100 dark:group-hover:bg-gray-700">
                        <Icon size={20} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block whitespace-normal break-words text-sm font-semibold ${active
                            ? "text-emerald-800 dark:text-emerald-300"
                            : "text-gray-900 dark:text-gray-100"
                            }`}
                        >
                          {item.title}
                        </span>

                        <span className="mt-1 block whitespace-normal break-words text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>


        <div className="min-w-0 flex-1 xl:mx-2 xl:max-w-md">
          <SearchBar />
        </div>


        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          
          <ThemeToggle />
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOptions((previous) => !previous)}
              aria-expanded={loginOptions}
              aria-label={
                customerLoggedIn ? "Account options" : "Login options"
              }
              className={`flex cursor-pointer items-center justify-center bg-gray-600 font-semibold text-white transition-colors duration-200 hover:bg-gray-700 ${customerLoggedIn
                ? "h-10 w-10 rounded-lg p-0"
                : "rounded-xl px-3 py-2 sm:px-4"
                }`}
            >
              {customerLoggedIn ? (
                <span
                  className="flex h-full w-full items-center justify-center rounded-lg text-lg font-bold uppercase text-white"
                  title={customerName || "Logged in"}
                >
                  {customerName.trim().charAt(0).toUpperCase() || "U"}
                </span>
              ) : (
                <span className="flex flex-1 items-center justify-center gap-2 text-center">
                  <UserRound size={20} className="shrink-0" />
                  <span className="text-sm sm:text-base">Login</span>
                </span>
              )}
            </button>

            {loginOptions && (
              <div className="absolute right-0 top-full z-[60] mt-3 w-[min(15rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-gray-200 bg-gray-500 p-2 shadow-lg shadow-black/10">
                {customerLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Logout"
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-3 text-center text-sm font-semibold bg-gray-800 text-gray-200 transition-all duration-200 hover:bg-gray-900 hover:text-white"
                  >
                    <LogOut size={21} className="shrink-0" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    title="Login as Customer"
                    className="flex items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-center text-sm font-semibold text-gray-200 transition-all duration-200 hover:bg-gray-900 hover:text-white"
                  >
                    <CircleUserRound size={21} className="shrink-0" />
                    <span>Login as User</span>
                  </Link>
                )}

                <div className="my-1 border-t border-gray-200" />

                <Link
                  href="/isAdmin"
                  onClick={closeMenus}
                  title="Login as Admin"
                  className="flex items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-center text-sm font-semibold text-gray-200 transition-all duration-200 hover:bg-gray-900 hover:text-white"
                >
                  <ShieldUser size={21} className="shrink-0" />
                  <span>Login as Admin</span>
                </Link>
              </div>
            )}
          </div>


          <button
            type="button"
            onClick={() => setMobileMenu((previous) => !previous)}
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-800 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 xl:hidden"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>


      {mobileMenu && (
        <div className="absolute right-3 top-full z-50 flex max-h-[calc(100vh-6rem)] w-[min(18rem,calc(100vw-1.5rem))] flex-col gap-2 overflow-y-auto rounded-xl border-2 border-gray-300 bg-white p-3 shadow-xl sm:right-6 xl:hidden">
          <Link href="/" onClick={closeMenus} className={link("/")}>
            <House size={18} className="mr-2 shrink-0" />
            Home
          </Link>

          <Link
            href="/products"
            onClick={closeMenus}
            className={link("/products")}
          >
            <Package size={18} className="mr-2 shrink-0" />
            Products
          </Link>

          <Link
            href="/orders"
            onClick={closeMenus}
            className={link("/orders")}
          >
            <ClipboardList size={18} className="mr-2 shrink-0" />
            My Orders
          </Link>



          <Link
            href="/cart"
            onClick={closeMenus}
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            className={`gap-3 ${link("/cart")}`}
          >
            <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
              <ShoppingCart size={19} className="shrink-0" />

              {cartCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold leading-none text-white shadow-sm dark:border-gray-800 dark:bg-amber-300 dark:text-gray-950"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </span>

            <span>Cart</span>
          </Link>



          <div className="mt-1 border-t border-gray-200 pt-2">
            <button
              type="button"
              onClick={() => setMobileHelpOpen((previous) => !previous)}
              aria-expanded={mobileHelpOpen}
              className={`relative flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-3 py-3 text-center text-sm font-semibold transition ${mobileHelpOpen || isHelpPage
                ? "bg-gray-600 text-white"
                : "bg-gray-500 text-white hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center justify-center gap-2 text-center">
                <Headset size={19} />
                Help & Information
              </span>

              <ChevronDown
                size={17}
                className={`absolute right-3 transition-transform ${mobileHelpOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {mobileHelpOpen && (
              <div className="mt-2 flex w-full flex-col gap-2">
                {helpLinks.map((item) => {
                  const Icon = item.icon;
                  const active = Pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={`group grid w-[calc(100%-4px)] mx-auto grid-cols-[1fr_auto_1fr] items-center rounded-lg border border-gray-300 px-3 py-3 text-center text-sm font-semibold transition ${active
                        ? "bg-gray-600 text-white"
                        : "text-gray-700 hover:bg-gray-600 hover:text-white"
                        }`}
                    >
                      <span className="flex justify-end">
                        <Icon
                          size={18}
                          className={`shrink-0 ${active
                            ? "text-white"
                            : "text-black group-hover:text-white"
                            }`}
                        />
                      </span>
                      <span className="col-start-2 ml-2 break-words text-center">
                        {item.title}
                      </span>
                      <span className="col-start-3" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;