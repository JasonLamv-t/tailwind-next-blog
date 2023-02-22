import { Author, Feed, FeedOptions } from 'feed';
import siteData from '#/meta/site';
import authorData from '#/meta/author';
import { BlogMeta } from '@/types/blog';

const author: Author = {
  name: authorData.name,
  email: authorData.social.email,
  link: siteData.url + '/about',
};

const feedOptions: FeedOptions = {
  title: siteData.title,
  description: siteData.description,
  id: siteData.url,
  link: siteData.url,
  image: siteData.url + siteData.logo,
  favicon: siteData.url + 'favicon.ico',
  copyright: `All rights reserved ${new Date().getFullYear()}, ${
    siteData.author
  }`,
  feedLinks: {
    rss2: siteData.url + '/rss.xml',
  },
  author,
};

const addBlogToFeed = (blog: BlogMeta & { href: string }) => {
  feed.addItem({
    title: blog.title,
    description: blog.summary,
    id: blog.href,
    link: siteData.url + blog.href,
    author: [author],
    date: new Date(blog.date),
    image: blog.image,
  });
};

const feed = { ...new Feed(feedOptions), addBlogToFeed };

export default feed;
