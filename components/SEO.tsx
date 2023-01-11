import author from 'data/meta/author';
import siteData from 'data/meta/site';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export const IndexSEO = ({}) => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={siteData.title}
        description={siteData.description}
        canonical={siteData.url + router.asPath}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: siteData.url + siteData.logo
          }
        ]}
        twitter={{
          handle: `@${author.social.twitter}`,
          site: `@${author.social.twitter}`,
          cardType: 'summary_large_image'
        }}
        openGraph={{
          type: 'website',
          url: siteData.url + router.asPath,
          title: siteData.title,
          description: siteData.description,
          images: [
            {
              url: siteData.url + siteData.banner
            }
          ]
        }}
      />
    </>
  );
};
