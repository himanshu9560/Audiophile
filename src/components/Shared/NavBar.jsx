import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Headphones", href: "/category/headphones" },
  { name: "Speakers", href: "/category/speakers" },
  { name: "Earphones", href: "/category/earphones" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function NavBar({ onCartIconClick, cartData }) {
  const keys = Object.keys(cartData)

  return (
    <Disclosure
      as="nav"
      className="bg-slate-950 z-40 absolute top-0 left-0 right-0 border-b border-white/10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto sm:w-11/12 px-6 py-6">
            <div className="flex items-center gap-4">
              
              {/* MOBILE BUTTON */}
              <div className="sm:hidden">
                <Disclosure.Button className="p-2 text-gray-300 hover:text-orange-400">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>

              {/* LOGO (UNCHANGED UI) */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
                  <Link to="/" className="flex items-center">
                    <img
                      className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                      src="/assets/shared/desktop/logo.svg"
                      alt="logo"
                    />
                  </Link>
                </div>

                {/* DESKTOP NAV (UNCHANGED) */}
                <div className="hidden sm:flex justify-center">
                  <div className="flex gap-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-base font-semibold tracking-wide text-gray-300 hover:text-orange-400 rounded-md px-3 py-3 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CART (UNCHANGED) */}
              <div className="relative flex justify-end items-center">
                <button
                  onClick={onCartIconClick}
                  className="p-2 text-gray-300 hover:text-orange-400 transition-transform hover:scale-110"
                >
                  <ShoppingCartIcon className="h-7 w-7" />
                </button>

                {keys.length > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {keys.length}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE MENU (FIXED) */}
          <Disclosure.Panel className="sm:hidden transition-all duration-300 ease-out">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-400 transition-all hover:translate-x-2"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
