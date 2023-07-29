'use client'

import Card from '@/components/Card';
import Image from 'next/image';
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  640: 1,
};

export default function Projects() {
  if (!allProjects.length) notFound();

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto space-x-12"
      columnClassName="space-y-2 sm:space-y-4"
      as="ul"
    >
      {allProjects.map(({ name, description, link, coverPath }) => (
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
          <Card.CTA>Learn more</Card.CTA>
        </Card>
      ))}
    </Masonry>
  );
}
