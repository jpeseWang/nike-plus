"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShoppingCartIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import jumpman from "../assets/images/jumpman.svg.png";
import nike from "../assets/images/nike.svg.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
const navigation = [
  {
    name: "Find a Store",
    href: "#",
    icon: ShoppingCartIcon,
  },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Join Us", href: "#", icon: ArrowRightOnRectangleIcon },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const router = useRouter();
  const handleMouseEnter = (index: any) => {
    setActiveItem(index);
  };
  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  const handleSignIn = () => {
    router.push("/authen/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-100">
      <nav
        className="mx-auto flex items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image
            className="h-6 w-auto"
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
          <div
            className="text-sm leading-6 text-gray-900 cursor-pointer hover:text-gray-400"
            onClick={() => router.push("/authen/login")}
          >
            Sign in <span aria-hidden="true">&rarr;</span>
          </div>
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
            className="h-6 w-auto"
            src={nike}
            alt=""
            onClick={() => router.push("/")}
          />
        </a>

        <div className="hidden lg:flex content-center pl-60">
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
          {/* <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-40 h-full w-5 text-gray-400"
            aria-hidden="true"
          /> */}
          <input
            className="relative text-sm leading-6 text-gray-900 bg-gray-100 px-4 py-2 rounded-3xl"
            type="text"
            placeholder="Search..."
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline mb-1 mx-2 ml-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
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
                <button className="ml-4-mx-3 inline rounded-full px-6 py-2 text-base font-semibold leading-7 bg-black text-white hover:opacity-50">
                  Join Us
                </button>
                <button
                  onClick={() => handleSignIn()}
                  className="ml-6 -mx-3 rounded-full px-6 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 inline border-2"
                >
                  Sign in
                </button>
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
