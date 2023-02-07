import { StaticImageData } from 'next/image';

export interface Project {
  name: string;
  description: string;
  link: string;
  logo: string | StaticImageData;
}
