import { StaticImageData } from 'next/image';
import JavaScript from '@/assets/images/resources/JavaScript.png';

export interface Resource {
  name: string;
  description: string;
  link: string;
  logo?: string | StaticImageData;
}

export const resources: Resource[] = [
  {
    name: 'JavaScript 基础知识图谱',
    description: '关于 JavaScript 你需要知道的基础内容｜Xmind文件',
    link: '/resources/JavaScript.xmind',
    logo: JavaScript,
  },
];
