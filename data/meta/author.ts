interface AuthorData {
  name: string;
  avatar: string;
  occupation: string;
  company: string;
  organization: string;
  location: string;
  social: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    acfun?: string;
    bilibili?: string;
  };
}

const authorData: AuthorData = {
  name: 'Jason Lam',
  avatar: '/static/images/avatar-22.jpg',
  occupation: 'Full Stack Engineer',
  company: '',
  organization: '',
  location: 'Shenzhen, China',
  social: {
    email: 'jasonlamv-t@hotmail.com',
    github: 'JasonLamv-t',
    linkedin: 'https://www.linkedin.cn/injobs/in/jason-lam-0827181b0',
    bilibili: '10905363'
    // twitter: 'JasonLamv-t',
    // facebook: 'jasonlamv.t',
    // youtube: '@jasonlamv-t'
  }
};

export default authorData;
