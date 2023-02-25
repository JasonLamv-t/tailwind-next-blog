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
  title?: string;
  prefix?: string;
  suffix?: string;
}

const SocialLinks: { [key: string]: SocialLink } = {
  rss: { Icon: IconRss, prefix: '/rss.xml' },
  email: { Icon: IconMail, prefix: 'mailto:' },
  github: {
    Icon: IconBrandGithub,
    prefix: 'https://github.com/',
    title: 'Github',
  },
  linkedin: { Icon: IconBrandLinkedin, title: 'Linkedin' },
  twitter: {
    Icon: IconBrandTwitter,
    prefix: 'https://twitter.com/',
    title: 'Twitter',
  },
  facebook: {
    Icon: IconBrandFacebook,
    prefix: 'https://www.facebook.com/',
    title: 'Facebook',
  },
  youtube: {
    Icon: IconBrandYoutube,
    prefix: 'https://www.youtube.com/',
    title: 'Youtube',
  },
  bilibili: {
    Icon: IconBrandBilibili,
    prefix: 'https://space.bilibili.com/',
    title: 'Bilibili',
  },
  weibo: { Icon: IconBrandWeibo, title: 'Weibo' },
  instagram: {
    Icon: IconBrandInstagram,
    prefix: 'https://www.instagram.com/',
    title: 'Instagram',
  },
};

const SocialIconLink = ({
  platform,
  value,
  className,
}: {
  platform: string;
  value: string;
  className?: string;
}) => {
  const { Icon, prefix, suffix, title } = SocialLinks[platform];
  return (
    <Link
      title={title ?? platform}
      href={toString(prefix) + value + toString(suffix)}
      className={clsx(className, 'w-6 h-6')}
    >
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
