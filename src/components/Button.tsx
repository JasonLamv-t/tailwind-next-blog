import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

export default function Button({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(className, 'focus:[&:not(:focus-visible)]:outline-none')}
      {...props}
    >
      {children}
    </button>
  );
}
