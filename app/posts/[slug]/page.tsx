import Code from '@/components/Code';
import Note from '@/components/Note';
import Pre from '@/components/Pre';
import Image from '@/components/Image';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const MDXContent = useMDXComponent(post.body.code);
  const components = {
    pre: Pre,
    code: Code,
    Note: Note,
    img: Image,
  };

  return (
    <div className="md:px-8">
      <article className="prose max-w-none dark:prose-invert">
        <header className="flex flex-col">
          <h1>{post.title}</h1>
          <time
            dateTime={post.date}
            className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span className="ml-3">
              {format(parseISO(post.date), 'yyyy-MM-dd')}
            </span>
          </time>
        </header>
        <div className="">
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
