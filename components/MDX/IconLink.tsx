import { h } from 'hastscript';

export const IconLink = h(
  'svg.w-6.h-6.absolute.-left-6.right-auto.hidden.group-hover:block',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    strokeWidth: '2',
    stroke: 'currentColor',
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  [
    h('path', {
      d: 'M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5',
    }),
    h('path', {
      d: 'M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5',
    }),
  ]
);
