import { ReactNode } from 'react';

const Code = ({ children, ...props }: { children?: ReactNode }) => {
  return <code {...props}>{children}</code>;
};

export default Code;
