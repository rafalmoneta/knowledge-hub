import * as React from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { classNames } from "@/lib/classnames";
import type { LinkProps } from "next/link";
import Link from "next/link";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeadlessMenu as="div" className="relative inline-flex">
      {children}
    </HeadlessMenu>
  );
};

export const MenuItems = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <HeadlessMenu.Items
        className={classNames(
          "absolute top-full right-0 z-50 mb-4 mt-2 origin-top-right divide-y rounded border bg-primary focus:outline-none",
          className
        )}
      >
        {children}
      </HeadlessMenu.Items>
    </Transition>
  );
};

export const MenuItemsContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="py-2"> {children} </div>;
};

const NextLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & React.ComponentPropsWithoutRef<"a">
>(({ href, children, ...rest }, forwardedRef) => {
  return (
    <Link href={href} ref={forwardedRef} {...rest}>
      {children}
    </Link>
  );
});

NextLink.displayName = "NextLink";

export const menuItemClasses = ({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) => {
  return classNames(
    active && "bg-secondary",
    "block w-full text-left px-4 py-2 text-sm text-primary transition-colors",
    className
  );
};

export const MenuItemLink = ({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <NextLink
          href={href}
          className={menuItemClasses({ active, className })}
        >
          {children}
        </NextLink>
      )}
    </HeadlessMenu.Item>
  );
};

export function MenuItemButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <button
          type="button"
          className={menuItemClasses({ active, className })}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  );
}

export const MenuButton = HeadlessMenu.Button;
