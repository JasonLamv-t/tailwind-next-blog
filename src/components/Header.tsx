import siteData from '#/meta/site';
import logo from '@/assets/images/logo.jpg';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Disclosure, Transition } from '@headlessui/react';
import { IconMenu2, IconMoon, IconSun, IconX } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Blogs', href: '/blogs' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' }
];

const Header = () => {
  const router = useRouter();

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <header className="flex items-center justify-between py-10">
            <div className="-mt-3">
              <Link href="/" aria-label={siteData.title}>
                <div className="flex items-center justify-between">
                  <Image
                    className="w-12 h-12 mt-3 rounded-full"
                    src={logo}
                    alt="logo"
                  />
                  <div className="ml-3 h-6 text-2xl font-semibold sm:block">
                    {siteData.title}
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Disclosure.Button
                className="sm:hidden block h-6 w-6"
                aria-hidden="true"
              >
                {open ? <IconX /> : <IconMenu2 />}
              </Disclosure.Button>
              <ThemeSwitcher />
            </div>
          </header>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                {navigation.map((link) => (
                  <Disclosure.Button
                    as="a"
                    key={link.href}
                    href={link.href}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      link.href === router.asPath
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : ' border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Header;