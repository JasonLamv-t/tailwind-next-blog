import Code from '@/components/MDX/Code';
import Image from '@/components/MDX/Image';
import Note from '@/components/MDX/Note';
import Pre from '@/components/MDX/Pre';
import { useMDXComponent } from 'next-contentlayer/hooks';

const MDX = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);
  const components = {
    ...Note,
    pre: Pre,
    code: Code,
    img: Image,
  };

  return <MDXContent components={components} />;
};

export default MDX;
