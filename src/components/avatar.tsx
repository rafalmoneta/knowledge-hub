import { classNames } from "@/lib/classnames";
import Image from "next/image";
import * as React from "react";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  size?: AvatarSize;
  name: string;
  src?: string | null;
};

const dimension: Record<AvatarSize, number> = {
  sm: 34,
  md: 48,
  lg: 128,
};

export function Avatar({ size = "md", name, src }: AvatarProps) {
  const initial = name.charAt(0).toLocaleLowerCase();

  return (
    <div className="relative inline-flex flex-shrink-0 rounded-full">
      {src ? (
        <>
          <Image
            src={src}
            alt={name}
            width={dimension[size]}
            height={dimension[size]}
            className="rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.04)]" />
        </>
      ) : (
        <div
          className={classNames(
            "inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full transition-colors",
            "text-primary border border-secondary bg-primary hover:bg-secondary",
            size === "sm" && "h-[34px] w-[34px] text-sm",
            size === "md" && "h-[48px] w-[48px] text-base",
            size === "lg" && "h-[128px] w-[128px] text-2xl"
          )}
        >
          <div>{initial}</div>
        </div>
      )}
    </div>
  );
}
