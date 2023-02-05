import author from '#/meta/author';
import siteData from '#/meta/site';
import { BlogMeta } from '@/types/blog';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export const IndexSEO = ({}) => {
  const url = siteData.url + useRouter().asPath;

  return (
    <NextSeo
      title={siteData.title}
      description={siteData.description}
      canonical={url}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: siteData.url + siteData.logo,
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
        title: siteData.title,
        description: siteData.description,
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
      titleTemplate={siteData.title + ' | %s'}
      description={summary}
      canonical={url}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: siteData.url + siteData.logo,
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
