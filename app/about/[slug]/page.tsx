'use client';

import SocialIconLink from '@/components/SocialIconLink';
import getAuthor from '@/libs/author';
import {
  IconBriefcase,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconFileText,
  IconMapPin,
  IconMinusVertical,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const AboutLayout = ({ params: { slug } }: { params: { slug: string } }) => {
  const author = getAuthor(slug);
  if (!author) notFound();

  const {
    name,
    avatarPath,
    location,
    occupation,
    company,
    organizations,
    social,
  } = author;

  return (
    <div className="flex flex-col">
      <div className="max-w-4xl mt-8 mx-auto md:ml-10 items-center grid grid-cols-1 sm:grid-cols-3 sm:space-x-6 md:space-x-8 lg:space-x-12">
        <Image
          className="w-48 md:w-56 lg:w-64 mx-auto sm:-rotate-2 rounded-2xl"
          src={avatarPath}
          alt="avatar"
          width={64}
          height={64}
        />
        <div className="mt-6 sm:col-span-2">
          <h1 className="text-2xl font-bold leading-8 mb-4">{name}</h1>

          <ul
            className="flex flex-col space-y-1 text-zinc-500 dark:text-gray-400 items-center sm:items-start"
            role="list"
          >
            {occupation && (
              <li className="inline-flex">
                <IconBriefcase className="mr-1" />
                {occupation}
              </li>
            )}
            {company && (
              <li className="inline-flex">
                <IconBuildingSkyscraper className="mr-1" />
                {company.url ? (
                  <Link href={company.url} className="hover:text-teal-400 ">
                    {company.name}
                  </Link>
                ) : (
                  company.name
                )}
              </li>
            )}
            {organizations && (
              <li key={name} className="inline-flex">
                <IconBuildingCommunity className="mr-1" />
                {organizations.map(({ name, url }, index) => (
                  <>
                    {url ? (
                      <Link
                        key={name}
                        href={url}
                        className="hover:text-teal-400"
                      >
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                    {index === organizations.length - 1 ? '' : <p>,&nbsp;</p>}
                  </>
                ))}
              </li>
            )}
            {location && (
              <li className="inline-flex">
                <IconMapPin className="mr-1" />
                {location}
              </li>
            )}
          </ul>

          <div className="flex flex-row mt-3 space-x-1 justify-center sm:justify-start">
            {social?.map(({ platform, value }) => (
              <SocialIconLink
                className="text-zinc-500 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500 mr-0.5"
                platform={platform}
                value={value}
                key={platform}
              />
            ))}
            <IconMinusVertical />
            <Link href="/data/(public)/resources/resume.pdf" title="resume">
              <IconFileText className="text-zinc-500 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500" />
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="prose max-w-none dark:prose-invert">
        <MDXRenderer code={code} />
      </div> */}
    </div>
  );
};

export default AboutLayout;
