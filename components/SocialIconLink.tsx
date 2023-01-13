import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandYoutube,
  TablerIcon
} from '@tabler/icons';
import Link from 'next/link';
import { toString } from 'lodash-es';

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
  youtube: { Icon: IconBrandYoutube, prefix: 'https://www.youtube.com/' }
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
    <Link href={toString(prefix) + value + toString(suffix)}>
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
