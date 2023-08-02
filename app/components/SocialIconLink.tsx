import Platform from '@/types/Platform';
import {
  Icon,
  IconBrandBilibili,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandWeibo,
  IconBrandYoutube,
  IconMail,
  IconRss,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { toString } from 'lodash-es';
import Link from 'next/link';

interface SocialLink {
  Icon: Icon;
  prefix?: string;
  suffix?: string;
}

type SocialLinks = { [p in Platform | 'RSS']: SocialLink };

const socialLinks: SocialLinks = {
  RSS: { Icon: IconRss, prefix: '/rss.xml' },
  Email: { Icon: IconMail, prefix: 'mailto:' },
  GitHub: { Icon: IconBrandGithub, prefix: 'https://github.com/' },
  Linkedin: { Icon: IconBrandLinkedin },
  Twitter: { Icon: IconBrandTwitter, prefix: 'https://twitter.com/' },
  Facebook: { Icon: IconBrandFacebook, prefix: 'https://www.facebook.com/' },
  Youtube: { Icon: IconBrandYoutube, prefix: 'https://www.youtube.com/' },
  Bilibili: { Icon: IconBrandBilibili, prefix: 'https://space.bilibili.com/' },
  Weibo: { Icon: IconBrandWeibo },
  Instagram: { Icon: IconBrandInstagram, prefix: 'https://www.instagram.com/' },
};

const SocialIconLink = ({
  platform,
  value,
  className,
}: {
  platform: Platform | 'RSS';
  value: string;
  className?: string;
}) => {
  const { Icon, prefix, suffix } = socialLinks[platform];
  return (
    <Link
      title={platform}
      href={toString(prefix) + value + toString(suffix)}
      className={clsx(className, 'w-6 h-6')}
    >
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
