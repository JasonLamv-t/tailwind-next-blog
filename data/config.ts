import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import Platform from '../app/types/Platform';

interface Config {
  siteMeta: {
    title: string;
    description: string;
    authors?: Author[];
    keywords?: string[] | string;
    locale: string;
    language: string;
    theme: 'system' | 'light' | 'dark';
    url: string;
    logo: string;
    banner: string;
    siteRepo?: string;
    openGraph?: OpenGraph; // TODO: add example setting
    twitter?: Twitter; // TODO: add example setting
  };
  navigation: [title: string, path: string][];
  feature?: {
    showCodeLineNumbers?: boolean;
    // TODO: To be implemented for local
    search?: 'algolia'; // | 'local'
  };
  footer?: {
    beian?: string;
    socialLinks?: [platform: Platform, value: string][];
  };
  env: { isAlgoliaAvailable: boolean }; // For env verify
}

const checkConfigAndEnvironments = (config: Omit<Config, 'env'>): Config => {
  const env = {
    isAlgoliaAvailable:
      !!process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID &&
      !!process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY &&
      !!process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME,
  };
  return { ...config, env };
};

const config: Config = checkConfigAndEnvironments({
  siteMeta: {
    title: 'Tailwind-next-blog',
    authors: [{ name: 'Jason Lam', url: '/about/JasonLamv-t' }],
    description: 'Demo of Tailwind-next-blog',
    locale: 'zh-CN',
    language: 'zh-cn, en-us',
    theme: 'system',
    url: 'https://tailwind-next-blog.jasonlam.cc',
    logo: '/data/images/logo.jpg',
    banner:
      'a personal blog project template based on NextJS and TailwindCSS, which can be used out of the box and has a high degree of custom freedom.',
    siteRepo: 'https://github.com/JasonLamv-t/tailwind-next-blog',
  },
  navigation: [
    ['Blogs', '/posts'],
    ['Projects', '/projects'],
    ['About', '/about'],
  ],
  feature: {
    search: 'algolia',
  },
  footer: {
    beian: '粤ICP备2021039182号',
    socialLinks: [
      [Platform.email, 'jasonlamv-t@hotmail.com'],
      [Platform.github, 'JasonLamv-t'],
      [Platform.linkedin, 'https://www.linkedin.com/in/jason-lam-0827181b0'],
      [Platform.bilibili, '10905363'],
      [Platform.instagram, 'jasonlamvt'],
      [Platform.weibo, 'https://weibo.com/u/5609011652'],
    ],
  },
});

export { config, config as default };
export const siteMeta = config.siteMeta;
export const navigation = config.navigation;
export const feature = config.feature;
export const footer = config.footer;
export const env = config.env;
