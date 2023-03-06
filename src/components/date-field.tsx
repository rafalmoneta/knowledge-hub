import React from "react";
import { classNames } from "@/lib/classnames";

export type DateFieldOwnProps = {
  label?: string;
};

type DateFieldProps = DateFieldOwnProps &
  React.ComponentPropsWithoutRef<"input">;

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  (
    { label, id, name, type = "datetime-local", className, ...rest },
    forwardedRef
  ) => {
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

DateField.displayName = "DateField";
