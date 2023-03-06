import type { ButtonVariant } from "@/components/button";
import type { LinkProps } from "next/link";
import { buttonClasses } from "@/components/button";
import Link from "next/link";
import * as React from "react";

type ButtonLinkProps = {
  variant?: ButtonVariant;
  responsive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href"> &
  LinkProps;

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      className,
      variant = "primary",
      responsive,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <Link
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        prefetch={prefetch}
        locale={locale}
        ref={forwardedRef}
        {...rest}
        className={buttonClasses({ className, variant, responsive })}
      ></Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
