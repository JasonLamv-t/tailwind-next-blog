import author from '#/meta/author';
import siteData from '#/meta/site';
import { BlogMeta } from '@/types/blog';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export const CommonSEO = ({
  title = siteData.title,
  description = siteData.description,
}: {
  title?: string;
  description?: string;
}) => {
  const url = siteData.url + useRouter().asPath;
  const isIndex = useRouter().pathname === '/index';

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      additionalLinkTags={[
        {
          rel: 'shortcut icon',
          href: siteData.url + '/favicon.ico',
        },
      ]}
      twitter={{
        handle: `@${author.social.twitter}`,
        site: `@${author.social.twitter}`,
        cardType: 'summary_large_image',
      }}
      openGraph={{
        type: 'website',
        url,
        title: title,
        description: description,
        images: [
          {
            url: siteData.url + siteData.banner,
          },
        ],
      }}
    />
  );
};

export const BlogSEO = ({
  title,
  summary,
  date,
  tags,
}: Pick<BlogMeta, 'title' | 'summary' | 'date' | 'tags'>) => {
  const url = siteData.url + useRouter().asPath;
  const time = new Date(date).toISOString();

  return (
    <NextSeo
      title={title}
      description={summary}
      canonical={url}
      additionalLinkTags={[
        {
          rel: 'shortcut icon',
          href: siteData.url + '/favicon.ico',
        },
      ]}
      twitter={{
        handle: `@${author.social.twitter}`,
        site: `@${author.social.twitter}`,
        cardType: 'summary_large_image',
      }}
      openGraph={{
        title,
        description: summary,
        url,
        type: 'article',
        article: {
          publishedTime: time,
          authors: [siteData.url + '/about'],
          tags: tags,
        },
      }}
    />
  );
};
