import { allAuthors } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import AuthorPage from './[slug]/page';

const AboutPage = () => {
  if (!allAuthors.length) notFound();

  if (allAuthors.length === 1) {
    const slug = allAuthors[0].url.replace('about/', '');
    return <AuthorPage params={{ slug }} />;
  }

  // TODO: add author list
};

export default AboutPage;
