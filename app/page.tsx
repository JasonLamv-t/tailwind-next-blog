import { siteMeta } from '#/config';
import Card from '@/components/Card';
import { IconPinFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { Post, allPosts } from 'contentlayer/generated';
import { orderBy } from 'lodash-es';

const Article = (post: Post) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card href={post.url} className="md:col-span-4">
        <Card.Title>
          {post.title}
          <IconPinFilled
            className={clsx(
              post.pinned
                ? 'ml-1 text-zinc-400 group-hover:block hidden'
                : 'hidden'
            )}
          />
        </Card.Title>
        <Card.Badges badges={post.tags} />
        <Card.Description>{post.summary}</Card.Description>
        <Card.CTA>Read more</Card.CTA>
      </Card>
    </article>
  );
};

const Home = () => {
  const posts = orderBy(
    allPosts.filter((post) => !post.draft),
    [(post) => post.pinned ?? false, 'date'],
    ['desc', 'desc']
  );

  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Latest
        </h1>
        <div className="text-lg leading-7">{siteMeta.description}</div>
      </div>

      <div className="flex flex-col space-y-2">
        {posts.map((post) => (
          <Article key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
