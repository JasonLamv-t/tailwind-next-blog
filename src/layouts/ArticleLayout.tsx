import { BlogMeta } from '@/types/blog';
import { ReactNode } from 'react';

export default function ArticleLayout({
  title,
  date,
  dateString,
  children,
}: BlogMeta & { children: ReactNode }) {
  return (
    <div className="px-8">
      <article className="prose max-w-none dark:prose-invert">
        <header className="flex flex-col">
          <h1>{title}</h1>
          <time
            dateTime={date}
            className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span className="ml-3">{dateString}</span>
          </time>
        </header>
        <div className="">{children}</div>
      </article>
    </div>
  );
}
