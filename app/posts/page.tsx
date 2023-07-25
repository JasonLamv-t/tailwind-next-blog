import Card from '@/components/Card';
import { IconPinFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { Post, allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { orderBy } from 'lodash-es';

const Article = (post: Post) => {
  return (
    <article className="md:grid md:grid-cols-5 md:items-baseline">
      <Card.Eyebrow
        as="time"
        className="hidden md:block md:col-span-1"
        dateTime={post.date}
      >
        {format(parseISO(post.date), 'yyyy-MM-dd')}
      </Card.Eyebrow>
      <Card href={post.url} className="md:col-span-4">
        <Card.Eyebrow
          as="time"
          className="md:hidden md:col-span-1"
          dateTime={post.date}
        >
          <div className="flex flex-row mb-2">
            <span
              className="h-5 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
              aria-hidden="true"
            />
            <span className="h-auto ml-2">
              {format(parseISO(post.date), 'yyyy-MM-dd')}
            </span>
          </div>
        </Card.Eyebrow>
        <Card.Title>
          {post.title}
          <IconPinFilled
            className={clsx(
              post.pinned ? 'ml-1 group-hover:block hidden' : 'hidden'
            )}
          />
        </Card.Title>
        {/* <Card.Badges badges={blog.tags} /> */}
        <Card.Description>{post.summary}</Card.Description>
        <Card.CTA>Read more</Card.CTA>
      </Card>
    </article>
  );
};

const PostList = () => {
  const posts = orderBy(
    allPosts.filter((post) => !post.draft),
    [(post) => post.pinned ?? false, 'date'],
    ['desc', 'desc']
  );

  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-4xl flex-col space-y-2">
        {posts.map((post) => (
          <Article key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
