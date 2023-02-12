import { BlogMeta } from '@/types/blog';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { Pre } from './Code';
import Note from './Note';

export default function MDXRenderer({
  code,
  layout,
  meta,
}: {
  code: string;
  layout: 'ArticleLayout' | 'AuthorLayout';
  meta?: BlogMeta;
}) {
  const MDXContent = useMemo(() => getMDXComponent(code), [code]);
  const wrapper = require(`@/layouts/${layout}`).default;
  const components = {
    wrapper,
    pre: Pre,
    Note: Note,
  };

  return <MDXContent components={components} {...meta} />;
}
