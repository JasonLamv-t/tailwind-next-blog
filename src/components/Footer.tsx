import authorData from '#/meta/author';
import siteData from '#/meta/site';
import SocialIconLink from '@/components/SocialIconLink';
import Link from 'next/link';

const Footer = () => {
  const socialData = Object.entries(authorData.social);

  return (
    <footer className="mt-16 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        {socialData.map(([platform, value]) => (
          <SocialIconLink platform={platform} value={value} key={platform} />
        ))}
      </div>
      <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{siteData.author}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        {siteData.beian ? (
          <>
            <div>{` • `}</div>
            <Link href="https://beian.miit.gov.cn/">{siteData.beian}</Link>
          </>
        ) : null}
      </div>
      <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="https://github.com/jasonlamv-t/tailwind-next-blog">
          Tailwind Next Blog
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
