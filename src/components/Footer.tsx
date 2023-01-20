import authorData from '#/meta/author';
import siteData from '#/meta/site';
import SocialIconLink from '@/components/SocialIconLink';
import Link from 'next/link';

const Footer = () => {
  const socialData = Object.entries(authorData.social);

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl py-10 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-4 md:order-1 ">
          {socialData.map(([platform, value]) => (
            <SocialIconLink
              className="hover:text-zinc-400"
              platform={platform}
              value={value}
              key={platform}
            />
          ))}
        </div>

        <div className="mt-4 md:order-2 md:mt-0 text-center text-xs leading-5 text-gray-500">
          <p className="md:text-right">
            Copyright &copy;
            {` ${new Date().getFullYear()} Jason Lam. All rights reserved.`}
          </p>

          <p className="md:text-right">
            {siteData.beian && (
              <Link href="https://beian.miit.gov.cn/">{siteData.beian} • </Link>
            )}
            Power by{' '}
            <Link href="https://github.com/jasonlamv-t/tailwind-next-blog">
              <span className="font-semibold">Tailwind Next Blog</span>.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
