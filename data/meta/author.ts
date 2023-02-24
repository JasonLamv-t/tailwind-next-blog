import avatar from '@/assets/images/avatar-22.jpg';
import { StaticImageData } from 'next/image';

interface AuthorData {
  name: string;
  avatar: string | StaticImageData;
  occupation: string;
  company: {
    name: string;
    link: string;
  };
  organization: {
    name: string;
    link: string;
  };
  location: string;
  social: {
    email?: string;
    github?: string;
    linkedin?: string; // full link
    twitter?: string;
    facebook?: string;
    youtube?: string;
    bilibili?: string;
    weibo?: string; // full link
    instagram?: string;
  };
}

const authorData: AuthorData = {
  name: 'Jason Lam / 林家祥',
  avatar: avatar,
  occupation: 'Full Stack Engineer',
  company: { name: '', link: '' },
  organization: {
    name: 'ServerlessDevs',
    link: 'https://github.com/Serverless-Devs',
  },
  location: 'Shenzhen, China',
  social: {
    email: 'jasonlamv-t@hotmail.com',
    github: 'JasonLamv-t',
    linkedin: 'https://www.linkedin.cn/injobs/in/jason-lam-0827181b0',
    bilibili: '10905363',
    instagram: 'jasonlamvt',
    weibo: 'https://weibo.com/u/5609011652',
    // twitter: 'JasonLamv-t',
    // facebook: 'jasonlamv.t',
    // youtube: '@jasonlamv-t'
  },
};

export default authorData;
