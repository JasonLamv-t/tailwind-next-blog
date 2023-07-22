import { Providers } from '@/components/Provider';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Providers>
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          <div className="py-32">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-zinc-200">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Go back home
                  <IconArrowRight className="h-auto ml-1 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </Providers>
    </>
  );
}
