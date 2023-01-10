import author from 'data/meta/author';
import site from 'data/meta/site';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export const IndexSEO = ({}) => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={site.title}
        description={site.description}
        canonical={site.url + router.asPath}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: site.url + site.logo
          }
        ]}
        twitter={{
          handle: `@${author.social.twitterId}`,
          site: `@${author.social.twitterId}`,
          cardType: 'summary_large_image'
        }}
        openGraph={{
          type: 'website',
          url: site.url + router.asPath,
          title: site.title,
          description: site.description,
          images: [
            {
              url: site.url + site.banner
            }
          ]
        }}
      />
    </>
  );
};
