import siteData from '#/meta/site';
import logo from '@/assets/images/logo.jpg';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Popover, Transition } from '@headlessui/react';
import { IconMenu2, IconMinusVertical, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Button from './Button';
import Search from './Search';

const navigation = [
  ['Blogs', '/blogs'],
  ['Projects', '/projects'],
  ['About', '/about'],
];

function NavItem({ href, children }: { href: string; children: string }) {
  const isActive = useRouter().pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
}

function MobileNavItem({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  );
}

function DesktopNavigation({ className }: { className?: string }) {
  return (
    <nav className={clsx(className)}>
      <ul className="flex text-sm font-medium text-zinc-800 backdrop-blur dark:text-zinc-200">
        {navigation.map(([name, href]) => (
          <NavItem href={href} key={name}>
            {name}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavigation({ className }: { className?: string }) {
  return (
    <Popover className={clsx(className)}>
      <Popover.Button
        className="flex items-center backdrop-blur p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/90 focus:[&:not(:focus-visible)]:outline-none"
        type="button"
        aria-label="Open navigation menu"
      >
        <IconMenu2 className="h-auto w-6 " />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="w-1/2 inset-x-4 fixed left-auto top-6 right-6 z-50 rounded-2xl bg-white p-6 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="fixed top-3 right-12 h-6 w-6 inline-flex gap-1">
              <ThemeSwitcher className=" hover:bg-inherit" />
              <Popover.Button
                aria-label="Close menu"
                className="focus:[&:not(:focus-visible)]:outline-none"
              >
                <Button className="w-8 h-8 text-zinc-500 ">
                  <IconX className="text-zinc-500 dark:text-zinc-400" />
                </Button>
              </Popover.Button>
            </div>

            <nav className="">
              <ul className="text-base text-zinc-800  dark:text-zinc-300">
                {navigation.map(([name, href]) => (
                  <MobileNavItem href={href} key={name}>
                    {name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
            <div></div>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

const Header = () => (
  <header className="flex items-center justify-between py-6 sm:py-10">
    <Link href="/" aria-label={siteData.title}>
      <div className="flex items-center justify-between">
        <Image
          className="w-9 h-9 rounded-full sm:w-12 sm:h-12"
          src={logo}
          alt="logo"
        />
        <div className="ml-3 h-auto text-2xl font-semibold hidden sm:block">
          {siteData.title}
        </div>
      </div>
    </Link>

    <div className="h-8 w-0.5 ml-4 mr-1 bg-zinc-500/80 hidden sm:block "></div>
    <DesktopNavigation className="ml-0 mr-auto hidden sm:block" />

    <div className="inline-flex gap-2 lg:w-full max-w-sm">
      <Search className="ml-auto" />
      <MobileNavigation className="sm:hidden" />
      <ThemeSwitcher className="hidden sm:block" />
    </div>
  </header>
);

export default Header;
