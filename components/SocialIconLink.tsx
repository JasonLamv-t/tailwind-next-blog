import SocialMedia from '@/types/SocialMedia';
import {
  Icon,
  IconBrandBilibili,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWeibo,
  IconBrandX,
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

type SocialLinks = { [p in SocialMedia | 'RSS']: SocialLink };

const socialLinks: SocialLinks = {
  RSS: { Icon: IconRss, prefix: '/rss.xml' },
  Email: { Icon: IconMail, prefix: 'mailto:' },
  GitHub: { Icon: IconBrandGithub, prefix: 'https://github.com/' },
  Linkedin: { Icon: IconBrandLinkedin },
  X: { Icon: IconBrandX, prefix: 'https://x.com/' },
  Facebook: { Icon: IconBrandFacebook, prefix: 'https://www.facebook.com/' },
  Youtube: { Icon: IconBrandYoutube, prefix: 'https://www.youtube.com/' },
  Bilibili: { Icon: IconBrandBilibili, prefix: 'https://space.bilibili.com/' },
  Weibo: { Icon: IconBrandWeibo },
  Instagram: { Icon: IconBrandInstagram, prefix: 'https://www.instagram.com/' },
};

const SocialIconLink = ({
  socialMedia,
  value,
  className,
}: {
  socialMedia: SocialMedia | 'RSS';
  value: string;
  className?: string;
}) => {
  const { Icon, prefix, suffix } = socialLinks[socialMedia];
  return (
    <Link
      title={socialMedia}
      href={toString(prefix) + value + toString(suffix)}
      className={clsx(className, 'w-6 h-6')}
    >
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
