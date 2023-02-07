import siteData from '#/meta/site';
import Card from '@/components/Card';
import { IndexSEO } from '@/components/SEO';
import { getAllBlogMetaAndSlug } from '@/libs/utils';
import { BlogMeta } from '@/types/blog';

function Article({ blog }: { blog: BlogMeta & { href: string } }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card href={blog.href} className="md:col-span-4">
        <Card.Eyebrow
          as="time"
          className="md:hidden md:col-span-1"
          dateTime={blog.date}
        >
          <div className="flex flex-row mb-2">
            <span
              className="h-5 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
              aria-hidden="true"
            />
            <span className="h-auto ml-2">{blog.dateString}</span>
          </div>
        </Card.Eyebrow>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Badges badges={blog.tags} />
        <Card.Description>{blog.summary}</Card.Description>
        <Card.CTA>Read more</Card.CTA>
      </Card>
    </article>
  );
}

export default function Home({
  blogs,
}: {
  blogs: (BlogMeta & { href: string })[];
}) {
  return (
    <>
      <IndexSEO />
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <div className="text-lg leading-7">{siteData.description}</div>
        </div>

        <div className="flex flex-col space-y-2">
          {blogs.map((blog) => (
            <Article key={blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  const AllBlogs = getAllBlogMetaAndSlug().map(({ meta, slug }) => ({
    ...meta,
    href: 'blogs/' + slug.join('/'),
  }));

  return { props: { blogs: AllBlogs } };
}
