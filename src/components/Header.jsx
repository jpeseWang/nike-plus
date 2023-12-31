"use client";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import jumpman from "../assets/images/jumpman.svg.png";
import nike from "../assets/images/nike.svg.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/contexts/CartContext";
import { signOut } from "next-auth/react";
const navigation = [
  {
    name: "Find a Store",
    href: "#",
    icon: ShoppingCartIcon,
  },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Join Us", href: "/auth/cta", icon: ArrowRightOnRectangleIcon },
];
const navigation2 = [
  {
    name: "New & Featured",
    href: "#",
    dropdown: [
      {
        title: "New Arrival",
        path: "/store",
      },
      {
        title: "Best seller",
        path: "/store",
      },
      {
        title: "Latest Clothing",
        path: "/store",
      },
    ],
  },
  {
    name: "Men",
    href: "/marketplace",
    dropdown: [
      {
        title: "Shirts",
        path: "/men/shirts",
      },
      {
        title: "Pants",
        path: "/men/pants",
      },
      {
        title: "Shoes",
        path: "/men/shoes",
      },
      {
        title: "Accessories",
        path: "/men/accessories",
      },
    ],
  },
  {
    name: "Women",
    href: "#",
    dropdown: [
      {
        title: "Dresses",
        path: "/women/dresses",
      },
      {
        title: "Tops",
        path: "/women/tops",
      },
      {
        title: "Bottoms",
        path: "/women/bottoms",
      },
      {
        title: "Shoes",
        path: "/women/shoes",
      },
    ],
  },
  {
    name: "Kids",
    href: "#",
    dropdown: [
      {
        title: "Boys",
        path: "/kids/boys",
      },
      {
        title: "Girls",
        path: "/kids/girls",
      },
    ],
  },
  {
    name: "Sale",
    href: "#",
    dropdown: [
      {
        title: "Outlet",
        path: "/men/shirts",
      },
      {
        title: "Black Friday",
        path: "/men/pants",
      },
      {
        title: "Flash Sale",
        path: "/men/shoes",
      },
    ],
  },
];

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const router = useRouter();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const session = useSession();

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (index) => {
    setActiveItem(index);
  };
  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  const handleSignIn = () => {
    router.push("/auth/login");
    setMobileMenuOpen(false);
  };
  const subtotal = cartProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
  const total = isNaN(subtotal) ? 0 : subtotal;
  return (
    <header className="bg-gray-100">
      <nav
        className="mx-auto flex items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image
            className="h-6 w-auto px-4 sm:px-20"
            src={jumpman}
            alt=""
            onClick={() => router.push("/")}
          />
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex ">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-regular leading-6 text-black hover:text-gray-400"
            >
              {item.name}
              <span className="px-2">|</span>
            </a>
          ))}

          {session.status === "authenticated" ? (
            <div
              className="text-sm leading-6 text-gray-900 cursor-pointer hover:text-gray-400 font-semibold"
              onClick={signOut}
            >
              Logout
            </div>
          ) : (
            <div
              className="text-sm leading-6 text-gray-900 cursor-pointer hover:text-gray-400"
              onClick={() => router.push("/auth/login")}
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </div>
          )}
        </div>
      </nav>
      {/* Header 2 */}
      <nav
        className="mx-auto flex items-center justify-between p-2 lg:px-8 bg-white"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image
            className="h-6 w-auto px-4 sm:px-20 mr-36"
            src={nike}
            alt=""
            onClick={() => router.push("/")}
          />
        </a>

        <div className="hidden lg:flex content-center ">
          {navigation2.map((item, index) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href}
                className={`font-semibold leading-6 text-gray-900 px-2 py-2 hover:border-b-2 hover:border-black ${
                  activeItem === index ? "border-b-4 mt-4" : ""
                }`}
              >
                {item.name}
              </a>
              {activeItem === index && item.dropdown && (
                <div className="absolute w-40 py-2 mt-4 bg-white rounded-lg shadow-lg">
                  {item.dropdown.map((dropdownItem) => (
                    <a
                      key={dropdownItem.title}
                      href={dropdownItem.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {dropdownItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="inline">
          {isLgScreen ? (
            <input
              className="relative text-sm leading-6 text-gray-900 bg-gray-100 px-4 py-2 rounded-3xl"
              type="text"
              placeholder="Search..."
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          )}
          {session.status === "authenticated" &&
          session.data.role === "admin" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline mb-1 mx-2 ml-6 cursor-pointer"
              onClick={() => router.push("/auth/dashboard")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          ) : (
            <span></span>
          )}

          <div className=" inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline mb-1 mx-4 cursor-pointer"
              onClick={() => {
                router.push("/marketplace/cart");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {isLgScreen ? (
              <p className="inline mb-1 font-xs -ml-3 lg:font-lg">
                Cart({total})
              </p>
            ) : (
              <span className="inline mb-1 font-xs -ml-3 lg:font-lg">
                ({total})
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile view */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              {navigation2.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 inline "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="-my-6 divide-y divide-gray-500/10">
              <Image className="my-6 h-8 w-auto inline" src={jumpman} alt="" />
              <span className="ml-4 text-lg border-none">Jordan</span>
              <div className="py-6 mt-10">
                <p className="my-4 text-xl text-gray-600">
                  Become a Nike Member for the best products, inspiration and
                  stories in sport.{" "}
                  <span className="font-semibold text-black">Learn more</span>
                </p>
                <Link
                  href="/auth/cta"
                  className="ml-4-mx-3 inline rounded-full px-6 py-3 text-base font-semibold leading-7 bg-black text-white hover:opacity-50"
                >
                  Join Us
                </Link>
                {session.status === "authenticated" ? (
                  <button
                    className="ml-6 -mx-3 rounded-full px-6 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 inline border-2"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => handleSignIn()}
                    className="ml-6 -mx-3 rounded-full px-6 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 inline border-2"
                  >
                    Sign in
                  </button>
                )}
              </div>
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <item.icon className="w-6 h-6 inline mr-2" /> {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
