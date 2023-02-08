import authorData from '#/meta/author';
import { CommonSEO } from '@/components/SEO';
import SocialIconLink from '@/components/SocialIconLink';
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
import { ReactNode } from 'react';

export default function AuthorLayout({ children }: { children: ReactNode }) {
  const { avatar, name, company, organization, occupation, location, social } =
    authorData;
  const socialData = Object.entries(social);

  return (
    <div className="flex flex-col">
      <CommonSEO title="Jason Lam | Brachistochrone" />

      <div className="max-w-4xl mt-8 mx-auto md:ml-10 items-center grid grid-cols-1 sm:grid-cols-3 sm:space-x-6 md:space-x-8 lg:space-x-12">
        <Image
          src={avatar}
          alt="avatar"
          className="w-48 md:w-56 lg:w-64 mx-auto sm:-rotate-2 rounded-2xl"
        />
        <div className="mt-6 sm:col-span-2">
          <h1 className="text-2xl font-bold leading-8 mb-4">{name}</h1>

          <ul
            className="flex flex-col space-y-1 text-zinc-500 dark:text-gray-400 items-center sm:items-start"
            role="list"
          >
            <li className="inline-flex">
              <IconBriefcase className="mr-1" />
              {occupation}
            </li>
            {company.name && (
              <li className="inline-flex">
                <IconBuildingSkyscraper className="mr-1" />
                {company.link ? (
                  <Link href={company.link} className="hover:text-teal-400 ">
                    {company.name}
                  </Link>
                ) : (
                  company.name
                )}
              </li>
            )}
            {organization.name && (
              <li className="inline-flex">
                <IconBuildingCommunity className="mr-1" />
                {organization.link ? (
                  <Link
                    href={organization.link}
                    className="hover:text-teal-400 "
                  >
                    {organization.name}
                  </Link>
                ) : (
                  organization.name
                )}
              </li>
            )}
            {location && (
              <li className="inline-flex">
                <IconMapPin className="mr-1" />
                {location}
              </li>
            )}
          </ul>

          <ul className="flex flex-row mt-3 space-x-1 justify-center sm:justify-start">
            {socialData.map(([platform, value]) => (
              <SocialIconLink
                className="text-zinc-500 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                platform={platform}
                value={value}
                key={platform}
              />
            ))}
            <IconMinusVertical />
            <Link href="/resources/resume.pdf" title="resume">
              <IconFileText className="text-zinc-500 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500" />
            </Link>
          </ul>
        </div>
      </div>
      <div className="prose max-w-none dark:prose-invert">{children}</div>
    </div>
  );
}
