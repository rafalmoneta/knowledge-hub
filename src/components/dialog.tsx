import { XIcon } from "@/components/icons";
import { classNames } from "@/lib/classnames";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import React from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
};

export function Dialog({
  isOpen,
  onClose,
  children,
  initialFocus,
}: DialogProps) {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <HeadlessDialog
        as="div"
        className={classNames(
          `${primaryFont.variable} ${secondaryFont.variable} font-sans`,
          "fixed inset-0 z-10 overflow-y-auto"
        )}
        onClose={onClose}
        open={isOpen}
        // initialFocus={initialFocus}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0 bg-primary opacity-90 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="mt-[15vh] mb-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-primary text-left align-middle shadow-xl transition-all dark:border">
              {children}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pt-6 pb-12">{children}</div>;
}

export function DialogActions({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 border-t px-6 py-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessDialog.Title as="h3" className="text-lg font-semibold">
      {children}
    </HeadlessDialog.Title>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeadlessDialog.Description className={className}>
      {children}
    </HeadlessDialog.Description>
  );
}

export function DialogCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute top-0 right-0 pt-6 pr-6">
      <button
        type="button"
        className="text-secondary hover:text-primary inline-flex items-center justify-center rounded-sm transition-colors hover:bg-secondary"
        onClick={onClick}
      >
        <span className="sr-only">Close</span>
        <XIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
