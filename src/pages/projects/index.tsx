import { Project } from '@/types/project';
import ServerlessDevsLogo from '@/assets/images/serverless-devs.jpeg';
import ReactAnnotateLogo from '@/assets/images/react-annotate.jpg';
import RemarkLogo from '@/assets/images/remark-logo.svg';
import Image from 'next/image';
import Card from '@/components/Card';
import { CommonSEO } from '@/components/SEO';

const projects: Project[] = [
  {
    name: 'Remark-toc-export',
    description:
      'Remark plugin to generate a toc based on h tags and spit the output back using callbacks.',
    link: 'https://github.com/JasonLamv-t/remark-toc-export#remark-toc-export',
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
