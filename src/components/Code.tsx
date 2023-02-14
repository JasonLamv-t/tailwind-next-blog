import { IconCheck, IconCopy } from '@tabler/icons-react';
import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';

export default function Code({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
}) {
  const codeBlockRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(codeBlockRef.current?.textContent ?? '');

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <code
      ref={codeBlockRef}
      className={clsx(className, 'relative group')}
      {...props}
    >
      <button
        className="absolute right-2 top-2 p-1 rounded border-0 bg-gray-700 dark:bg-gray-800 hidden group-hover:block"
        onClick={onCopy}
      >
        {copied ? (
          <IconCheck className="text-green-400" />
        ) : (
          <IconCopy className="text-gray-300" />
        )}
      </button>
      {children}
    </code>
  );
}
