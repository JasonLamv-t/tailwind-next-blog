import { IconBrandBilibili } from '@/components/Icons';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconMail,
  TablerIcon
} from '@tabler/icons';
import { toString } from 'lodash-es';
import Link from 'next/link';

interface SocialLink {
  Icon: TablerIcon;
  prefix?: string;
  suffix?: string;
}

const SocialLinks: { [key: string]: SocialLink } = {
  email: { Icon: IconMail, prefix: 'mailto:' },
  github: { Icon: IconBrandGithub, prefix: 'https://github.com/' },
  linkedin: { Icon: IconBrandLinkedin },
  twitter: { Icon: IconBrandTwitter, prefix: 'https://twitter.com/' },
  facebook: { Icon: IconBrandFacebook, prefix: 'https://www.facebook.com/' },
  youtube: { Icon: IconBrandYoutube, prefix: 'https://www.youtube.com/' },
  bilibili: { Icon: IconBrandBilibili, prefix: 'https://space.bilibili.com/' }
};

const SocialIconLink = ({
  platform,
  value
}: {
  platform: string;
  value: string;
}) => {
  const { Icon, prefix, suffix } = SocialLinks[platform];
  return (
    <Link
      href={toString(prefix) + value + toString(suffix)}
      className="w-6 h-6"
    >
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
