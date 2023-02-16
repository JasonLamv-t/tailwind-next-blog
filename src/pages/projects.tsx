import ReactAnnotateLogo from '@/assets/images/projects/react-annotate.jpg';
import RehypeLogo from '@/assets/images/projects/rehype-logo.svg';
import RemarkLogo from '@/assets/images/projects/remark-logo.svg';
import ServerlessDevsLogo from '@/assets/images/projects/serverless-devs.jpeg';
import Card from '@/components/Card';
import { CommonSEO } from '@/components/SEO';
import { Project } from '@/types/project';
import Image from 'next/image';

const projects: Project[] = [
  {
    name: 'Rehype-code-title',
    description:
      'Rehype plugin to add code block title in pre element as div element.',
    link: 'https://github.com/JasonLamv-t/rehype-code-title#rehype-code-title',
    logo: RehypeLogo,
  },
  {
    name: 'Remark-toc-extract',
    description:
      'Remark plugin to generate a toc based on h tags and spit the output back using callbacks.',
    link: 'https://github.com/JasonLamv-t/remark-toc-extract#remark-toc-extract',
    logo: RemarkLogo,
  },
  {
    name: 'React-annotate',
    description: 'React component for computer vision dataset annotation.',
    link: 'https://github.com/ZitySpace/react-annotate',
    logo: ReactAnnotateLogo,
  },
  {
    name: 'Serverless-Devs / FC',
    description:
      'Serverless Devs is an open source and open platform for Serverless developers, which is committed to providing developers with a strong tool chain architecture.',
    link: 'https://github.com/Serverless-Devs/Serverless-Devs',
    logo: ServerlessDevsLogo,
  },
];

export default function Projects() {
  return (
    <>
      <CommonSEO title="Projects | Brachistochrone" />
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name} href={project.link}>
            <Card.Eyebrow>
              <Image
                src={project.logo}
                alt={`logo of ${project.name}`}
                className="mb-4 sm:rounded-lg sm:min-h-48 object-cover"
              />
            </Card.Eyebrow>
            <Card.Title>{project.name}</Card.Title>
            <Card.Description>{project.description}</Card.Description>
            <Card.CTA>Learn more</Card.CTA>
          </Card>
        ))}
      </ul>
    </>
  );
}
