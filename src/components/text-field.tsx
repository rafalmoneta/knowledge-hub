import { classNames } from "@/lib/classnames";
import * as React from "react";

export type TextFieldOwnProps = {
  label?: string;
};

type TextFieldProps = TextFieldOwnProps &
  React.ComponentPropsWithoutRef<"input">;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, type = "text", className, ...rest }, forwardedRef) => {
    return (
      <div>
        {label && (
          <label htmlFor={id || name} className="mb-2 block font-semibold">
            {label}
          </label>
        )}
        <input
          {...rest}
          ref={forwardedRef}
          id={id || name}
          name={name}
          type={type}
          className={classNames(
            "focus-ring block w-full rounded border border-secondary bg-secondary py-1 px-2 text-sm shadow-sm",
            className
          )}
        />
      </div>
    );
  }
);

TextField.displayName = "TextField";
