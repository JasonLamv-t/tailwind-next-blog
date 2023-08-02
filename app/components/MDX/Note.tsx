import { IconInfoCircle, IconAlertTriangleFilled } from '@tabler/icons-react';
import React from 'react';
import { ReactNode } from 'react';

const Info = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-blue-300 bg-blue-50 p-4 leading-6 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-400 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.blue.300)]">
      <IconInfoCircle className="mt-0.5 h-5 w-5 flex-none stroke-blue-500 dark:fill-blue-200/20 dark:stroke-blue-400" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};

const Warn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-red-300 bg-red-200/70 p-4 leading-6 text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.red.300)]">
      <IconAlertTriangleFilled className="mt-0.5 h-5 w-5 flex-none fill-red-500 stroke-white dark:fill-yellow-500 dark:stroke-red-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};

const Note = { Info, Warn };

export { Info, Warn, Note as default };
