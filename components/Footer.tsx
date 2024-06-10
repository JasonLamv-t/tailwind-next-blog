import config from '#/config';
import Link from 'next/link';
import SocialIconLink from './SocialIconLink';

const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="mx-auto max-w-7xl py-10 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-4 md:order-1 ">
          {config.footer?.socialLinks?.map(([socialMedia, value]) => (
            <SocialIconLink
              className="hover:text-zinc-400"
              socialMedia={socialMedia}
              value={value}
              key={socialMedia}
            />
          ))}
          {/* TODO: enable rss */}
          {/* <SocialIconLink
            className="hover:text-zinc-400"
            socialMedia="RSS"
            value=""
          /> */}
        </div>

        <div className="mt-4 md:order-2 md:mt-0 text-center text-xs leading-5 text-gray-500">
          <p className="md:text-right">
            Copyright &copy;
            {` ${new Date().getFullYear()} ${config.siteMeta.authors
              ?.map((author) => author.name)
              .join(', ')}. All rights reserved.`}
          </p>

          <p className="md:text-right">
            {config.footer?.beian && (
              <>
                <Link
                  href="https://beian.miit.gov.cn/"
                  className="hover:text-zinc-400"
                >
                  {config.footer.beian}
                </Link>{' '}
                •{' '}
              </>
            )}
            Power by{' '}
            <Link
              href="https://github.com/jasonlamv-t/tailwind-next-blog"
              className="hover:text-zinc-400"
            >
              <span className="font-semibold">Tailwind Next Blog</span>.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
