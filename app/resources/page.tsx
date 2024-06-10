'use client';

import Card from '@/components/Card';
import { allResources } from 'contentlayer/generated';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  640: 1,
};

export default function Projects() {
  if (!allResources.length) notFound();

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto space-x-12"
      columnClassName="space-y-2 sm:space-y-4"
      as="ul"
    >
      {allResources.map(({ name, category, description, link, coverPath }) => (
        <Card key={name} href={link}>
          {coverPath && (
            <Card.Eyebrow>
              <Image
                width={500}
                height={400}
                src={coverPath}
                alt={`logo of ${name}`}
                className="mx-auto mb-4 sm:rounded-lg sm:min-h-48 object-cover"
              />
            </Card.Eyebrow>
          )}
          <Card.Title className="text-lg">{name}</Card.Title>
          <Card.Description className="leading-normal">
            {description}
          </Card.Description>
          <Card.CTA>
            {category === 'article' ? 'Learn more' : 'Download'}
          </Card.CTA>
        </Card>
      ))}
    </Masonry>
  );
}
