import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import SocialMedia from './SocialMedia';

type Navigation = [
  /**
   * The title of the navigation item, will be shown in the navigation bar.
   */
  title: string,
  /**
   * The path of the navigation item, will be used to navigate to the corresponding page.
   */
  path: string
];

type SocialLink = [
  /**
   * The name of the social media platform. Is a predefined enum.
   */
  SocialMedia: SocialMedia,
  /**
   * Username or user id of the social media platform.
   * Specially, For Weibo and LinkedIn, it should be the full URL.
   */
  value: string
];

export default interface Config {
  siteMeta: {
    /**
     * The title of the website.
     */
    title: string;
    /*
     * The description of the website.
     */
    description: string;
    /**
     * The authors of the website.
     */
    authors?: Author[];
    /**
     * The keywords of the website.
     * Can be a string or an array of strings.
     */
    keywords?: string[] | string;
    /**
     * The locale of the website.
     */
    locale: string;
    /**
     * The language of the website.
     */
    language: string;
    /**
     * The theme of the website.
     * Can be 'system', 'light', or 'dark'.
     * Default is 'system'.
     */
    theme: 'system' | 'light' | 'dark';
    /**
     * The URL of the website.
     */
    url: string;
    /**
     * The image to use as the logo of the website.
     * Can be a URL or a path to an image file.
     */
    logo: string;
    /**
     * The image to use as the banner of the website.
     */
    banner: string;
    /**
     * The repository of the website.
     */
    siteRepo?: string;
    openGraph?: OpenGraph; // TODO: add example setting
    x?: Twitter; // TODO: add example setting
  };
  /**
   * The navigations of the website. Bound to the mdx foloders.
   */
  navigations: Navigation[];
  /**
   * Configuration of the feature of the website.
   */
  feature?: {
    /**
     * Whether to show the code line numbers. Default is true.
     */
    showCodeLineNumbers?: boolean;
    // TODO: To be implemented
    // search?: 'algolia'; // | 'local'
  };
  /**
   * The configuration of the footer of the website.
   */
  footer?: {
    /**
     * Mainland China Website Registration Number.
     * Will be shown in as link, which leads to the Ministry of Industry and Information Technology website.
     */
    beian?: string;
    socialLinks?: SocialLink[];
  };
  // TODO: To be implemented
  // env: {
  //   algolia: {
  //     app_id: string | undefined;
  //     api_key: string | undefined;
  //     index_name: string | undefined;
  //   };
  //   isAlgoliaAvailable: boolean;
  // };
}
