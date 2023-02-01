import clsx from 'clsx';
import { ReactNode } from 'react';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <article className="prose max-w-none dark:prose-invert">
      <div className="">{children}</div>
    </article>
  );
}
