import { projects } from '#/meta/projects';
import Card from '@/components/Card';
import { CommonSEO } from '@/components/SEO';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  640: 1,
};

export default function Projects() {
  return (
    <>
      <CommonSEO title="Projects | Brachistochrone" />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto space-x-12"
        columnClassName="space-y-2 sm:space-y-4"
        as="ul"
      >
        {projects.map((project) => (
          <Card key={project.name} href={project.link}>
            {project.logo && (
              <Card.Eyebrow>
                <Image
                  width={500}
                  height={400}
                  src={project.logo}
                  alt={`logo of ${project.name}`}
                  className="mb-4 sm:rounded-lg sm:min-h-48 object-cover"
                />
              </Card.Eyebrow>
            )}
            <Card.Title className="text-lg">{project.name}</Card.Title>
            <Card.Description className='leading-normal'>{project.description}</Card.Description>
            <Card.CTA>Learn more</Card.CTA>
          </Card>
        ))}
      </Masonry>
    </>
  );
}
