import MDNLogo from '@/assets/images/projects/mdn.png';
import ReactAnnotateLogo from '@/assets/images/projects/react-annotate.jpg';
import RehypeLogo from '@/assets/images/projects/rehype-logo.svg';
import RemarkLogo from '@/assets/images/projects/remark-logo.svg';
import ServerlessDevsLogo from '@/assets/images/projects/serverless-devs.jpeg';
import { StaticImageData } from 'next/image';

export interface Project {
  name: string;
  description: string;
  link: string;
  logo?: string | StaticImageData;
}

export const projects: Project[] = [
  {
    name: 'MDN Web Docs / Localization',
    description: '参与 MDN 文档的本地化，包括翻译、审查并向 MDN 社区提出建设意见',
    link: 'https://github.com/mdn/translated-content',
    logo: MDNLogo,
  },
  {
    name: 'Rehype code title',
    description:
      'Rehype plugin to add code block title in pre element as div element.',
    link: 'https://github.com/JasonLamv-t/rehype-code-title#rehype-code-title',
    logo: RehypeLogo,
  },
  {
    name: 'Tailwind Next Blog',
    description:
      'A personal blog project template based on NextJS and TailwindCSS, which can be used out of the box and has a high degree of custom freedom. ',
    link: 'https://github.com/JasonLamv-t/tailwind-next-blog',
  },
  {
    name: 'React annotate',
    description: 'React component for computer vision dataset annotation.',
    link: 'https://github.com/ZitySpace/react-annotate',
    logo: ReactAnnotateLogo,
  },
  {
    name: 'Remark toc extract',
    description:
      'Remark plugin to generate a toc based on h tags and spit the output back using callbacks.',
    link: 'https://github.com/JasonLamv-t/remark-toc-extract#remark-toc-extract',
    logo: RemarkLogo,
  },
  {
    name: 'Serverless-Devs / FC',
    description:
      'Serverless Devs is an open source and open platform for Serverless developers, which is committed to providing developers with a strong tool chain architecture.',
    link: 'https://github.com/Serverless-Devs/Serverless-Devs',
    logo: ServerlessDevsLogo,
  },
  {
    name: 'MPCB(meizu photo cloud backup)',
    description: '魅族云相册备份下载器， 简洁高效地批量下载魅族云相册中的图片',
    link: 'https://github.com/moreant/mpcb',
  },
];
