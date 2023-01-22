interface SiteData {
  title: string;
  headerTitle: string;
  author: string;
  description: string;
  locale: string;
  language: string;
  theme: 'system' | 'light' | 'dark';
  url: string;
  logo: string;
  banner: string;
  beian?: string;
  siteRepo?: string;
}

const siteData: SiteData = {
  title: 'Brachistochrone',
  headerTitle: 'Brachistochrone',
  author: 'Jason Lam',
  description: "Jason Lam's personal website",
  language: 'zh-cn, en-us',
  theme: 'system', // system, dark or light
  url: 'https://jasonlam.cc',
  logo: '/images/logo.jpg',
  banner: '/images/pandas.jpg',
  locale: 'zh-CN',
  // beian: '粤ICP备2021039182号'
  // siteRepo: 'https://github.com/JasonLamv-t/jasonlamv-t.github.io',
  // image: '/static/images/avatar-22.jpg',
};

export default siteData;
