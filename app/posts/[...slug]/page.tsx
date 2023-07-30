import MDX from "@/components/MDX";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({
    slug: post.url.split("/").slice(1),
  }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const post = allPosts.find(
    (post) => post.url === decodeURI("posts/" + params.slug.join("/")),
  );

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const post = allPosts.find(
    (post) => post.url === decodeURI("posts/" + params.slug.join("/")),
  );
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

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
              {format(parseISO(post.date), "yyyy-MM-dd")}
            </span>
          </time>
        </header>
        <div className="">
          <MDX code={post.body.code} />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
