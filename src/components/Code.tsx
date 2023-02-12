import { IconCheck, IconCopy } from '@tabler/icons-react';
import { ReactNode, useRef, useState } from 'react';

export const Pre = ({ children }: { children?: ReactNode }) => {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(codeBlockRef.current?.textContent ?? '');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      ref={codeBlockRef}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 p-1 rounded border-0 bg-gray-700 dark:bg-gray-800`}
          onClick={onCopy}
        >
          {copied ? (
            <IconCheck className="text-green-400" />
          ) : (
            <IconCopy className="text-gray-300" />
          )}
        </button>
      )}

      <pre>{children}</pre>
    </div>
  );
};
