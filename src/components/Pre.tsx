import { ReactNode, useRef, useState } from 'react';

const Pre = ({ children, id }: { children?: ReactNode; id?: string }) => {
  return <pre>{children}</pre>;
};

export default Pre;
