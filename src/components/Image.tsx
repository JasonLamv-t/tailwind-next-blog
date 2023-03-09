import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  useState,
} from 'react';

export default function Image({
  ...props
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <img
        {...props}
        alt={props.alt ?? ''}
        onClick={() => {
          setOpen(true);
        }}
        className={clsx('cursor-zoom-in', open ? 'invisible' : '')}
      />
      ;
      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-md dark:bg-black/40" />

          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="w-full p-4 items-center justify-center">
              <img
                {...props}
                alt={props.alt ?? ''}
                onClick={() => {
                  setOpen(false);
                }}
                className="cursor-zoom-out w-full h-full object-contain object-center"
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      ;
    </>
  );
}
