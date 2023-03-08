import { resources } from '#/meta/resources';
import Card from '@/components/Card';
import { CommonSEO } from '@/components/SEO';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  640: 1,
};

export default function Resources() {
  return (
    <>
      <CommonSEO title="Resources | Brachistochrone" />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto space-x-12"
        columnClassName="space-y-2 sm:space-y-4"
        as="ul"
      >
        {resources.map((resource) => (
          <Card key={resource.name} href={resource.link}>
            {resource.logo && (
              <Card.Eyebrow>
                <Image
                  src={resource.logo}
                  alt={`logo of ${resource.name}`}
                  className="mb-4 sm:rounded-lg sm:min-h-48 object-cover"
                />
              </Card.Eyebrow>
            )}
            <Card.Title className="text-lg">{resource.name}</Card.Title>
            <Card.Description className="leading-normal">
              {resource.description}
            </Card.Description>
            <Card.CTA>Learn more</Card.CTA>
          </Card>
        ))}
      </Masonry>
    </>
  );
}
