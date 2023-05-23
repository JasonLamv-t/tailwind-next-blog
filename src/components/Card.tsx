import { IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { ElementType, ReactNode } from 'react';

export default function Card({
  as: Component = 'div',
  className,
  children,
  href,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <Component
      className={clsx(
        className,
        'group -mx-4 p-4 sm:px-6 sm:py-8 sm:rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
      )}
    >
      <Link href={href}>{children}</Link>
    </Component>
  );
}

Card.Title = function Title({
  as: Component = 'h2',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Component className={clsx(className, 'font-bold inline-flex')}>{children}</Component>
  );
};

Card.Badges = function Badges({ badges }: { badges: string[] }) {
  return (
    <div className="space-x-2">
      {badges.map((badge) => (
        <span
          className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
          key={badge}
        >
          {badge}
        </span>
      ))}
    </div>
  );
};

Card.Description = function Description({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={clsx(
        className,
        'mt-3 text-sm text-zinc-500 dark:text-zinc-400'
      )}
    >
      {children}
    </p>
  );
};

Card.CTA = function CTA({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="mt-4 flex items-center text-sm font-medium text-teal-500 group-hover:text-indigo-500"
    >
      {children}
      <IconArrowRight className="h-auto ml-1 w-4" />
    </div>
  );
};

Card.Eyebrow = function Eyebrow({
  as: Component = 'p',
  className,
  children,
  ...props
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & { [key: string]: any }) {
  return (
    <Component
      className={clsx(className, 'text-sm text-zinc-400 dark:text-zinc-500')}
      {...props}
    >
      {children}
    </Component>
  );
};
