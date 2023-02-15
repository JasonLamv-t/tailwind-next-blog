import { ReactNode, useRef, useState } from 'react';

export default function Code({ children, ...props }: { children?: ReactNode }) {
  return <code {...props}>{children}</code>;
}
