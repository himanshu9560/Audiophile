import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon,  } from '@heroicons/react/24/outline'
// import { motion } from "framer-motion"


const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Headphones', href: '/category/headphones', current: false },
  { name: 'Speakers', href: '/category/speakers', current: false },
  { name: 'Earphones', href: '/category/earphones', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({onCartIconClick, cartData}) {
  const keys = Object.keys(cartData)

  return (
    <Disclosure as="nav" className="bg-slate-950 z-40 absolute top-0 left-0 right-0
             animate-[slideDown_0.6s_ease-out] border-b border-white/10">
      {({ open }) => (
        <>
          <div className="mx-auto sm:w-11/12 px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="p-2 text-gray-300 hover:text-orange-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center
    absolute left-1/2 -translate-x-1/2
    sm:static sm:translate-x-0">
                  <a href="/" className='flex items-center'>
                    <img
                      className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                      src="/assets/shared/desktop/logo.svg"
                      alt="Your Company"
                    />
                  </a>
                </div>
                
                <div className="hidden sm:flex justify-center">
                  <div className="flex gap-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-base font-semibold tracking-wide text-gray-300 hover:text-orange-400',
                          'rounded-md px-3 py-3 text-base font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative flex justify-end items-center">
                <button
                  type="button"
                  className="p-2 text-gray-300 hover:text-orange-400 transition-transform hover:scale-110"
                  onClick={onCartIconClick}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingCartIcon className="h-7 w-7" aria-hidden="true" />
                </button>

                {keys.length > 0 && <div className="   absolute -top-1 -right-1
          h-4 w-4
          bg-orange-500 text-white
          text-[10px] font-bold
          rounded-full
          flex items-center justify-center">{keys.length}</div>}
                

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden transition-all duration-300 ease-out">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300  hover:text-orange-400',
                    'block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 hover:translate-x-2'
                  )}
                  aria-current={item.current ? 'page' : undefined}
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
