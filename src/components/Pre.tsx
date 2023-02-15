import { IconCheck, IconCopy } from '@tabler/icons-react';
import clsx from 'clsx';
import { ReactElement, useRef, useState } from 'react';

const Pre = ({ children }: { children?: ReactElement }) => {
  const codeBlockRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const CodeTitle = [children]
    .flat()
    .find(
      (child) => child?.type === 'div' && child.props.className === 'code-title'
    );

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      codeBlockRef.current?.textContent?.substring(
        CodeTitle?.props.children.length
      ) ?? ''
    );

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative group">
      <pre ref={codeBlockRef}>
        <button
          className={clsx(
            'absolute right-3 p-1 rounded-lg border-0 bg-gray-700 dark:bg-gray-800 hidden group-hover:block',
            !!CodeTitle ? 'top-12 mt-1' : 'top-3'
          )}
          onClick={onCopy}
        >
          {copied ? (
            <IconCheck className="text-green-400" />
          ) : (
            <IconCopy className="text-gray-300" />
          )}
        </button>
        {children}
      </pre>
    </div>
  );
};

export default Pre;
