import type { ButtonVariant } from "@/components/button";
import { classNames } from "@/lib/classnames";
import * as React from "react";

export type IconButtonOwnProps = {
  variant?: ButtonVariant;
};

type IconButtonProps = IconButtonOwnProps &
  React.ComponentPropsWithoutRef<"button">;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant = "primary", type = "button", ...rest },
    forwardedRef
  ) => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        type={type}
        className={classNames(
          "inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-md transition-colors",
          "focus:border-blue-500 focus:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 dark:focus:ring-blue-800",
          variant === "primary" &&
            "bg-secondary-inverse hover:bg-primary-inverse text-secondary-inverse hover:text-primary-inverse",
          variant === "secondary" &&
            "text-primary border border-secondary bg-primary hover:bg-secondary",
          className
        )}
      />
    );
  }
);

IconButton.displayName = "IconButton";
