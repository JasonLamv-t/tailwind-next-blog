import siteData from '#/meta/site';
import logo from '@/assets/images/logo.jpg';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Popover, Transition } from '@headlessui/react';
import { IconMenu2, IconX } from '@tabler/icons';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

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
    <nav className={clsx(className, 'ml-auto mr-0')}>
      <ul className="flex px-3 text-sm font-medium text-zinc-800 backdrop-blur dark:text-zinc-200">
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
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        <IconMenu2 className="h-auto w-5 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
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
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <IconX className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {navigation.map(([name, href]) => (
                  <MobileNavItem href={href} key={name}>
                    {name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
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

    <DesktopNavigation className="hidden sm:block" />
    <MobileNavigation className="sm:hidden" />

    <ThemeSwitcher />
  </header>
);

export default Header;
