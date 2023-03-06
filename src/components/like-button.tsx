import React from "react";
import { classNames } from "@/lib/classnames";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSession } from "next-auth/react";
import { Button } from "./button";
import { HeartFilledIcon, HeartIcon } from "./icons";

const MAX_LIKED_BY_SHOWN = 30;

type LikeButtonProps = {
  likedBy: {
    user: {
      id: string;
      name: string | null;
    };
  }[];
  onLike: () => void;
  onUnlike: () => void;
};

export function LikeButton({ likedBy, onLike, onUnlike }: LikeButtonProps) {
  const { data: session } = useSession();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const likeCount = likedBy.length;

  const isLikedByCurrentUser = Boolean(
    likedBy.find((item) => item.user.id === session?.user.id)
  );

  const handleLikeClick = () => {
    if (isAnimating) return;

    if (isLikedByCurrentUser) {
      onUnlike();
    } else {
      setIsAnimating(!isAnimating);
      onLike();
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger
          asChild
          onClick={(event) => event.preventDefault()}
          onMouseDown={(event) => event.preventDefault()}
        >
          <Button
            variant="secondary"
            className={classNames(
              "h-[34px] space-x-1.5 overflow-hidden border transition-colors [transform:translateZ(0)]",
              isLikedByCurrentUser &&
                "border-red-500 !bg-red-500 dark:border-red-700 dark:!bg-red-900",
              isAnimating && "!border-red-600 !bg-red-600 dark:!bg-red-600"
            )}
            onClick={handleLikeClick}
            disabled={isAnimating}
          >
            <span className="relative block h-4 w-4 shrink-0">
              {isLikedByCurrentUser && !isAnimating ? (
                <HeartFilledIcon className="scale-1 absolute inset-0 text-gray-50" />
              ) : (
                <>
                  <HeartIcon
                    className={classNames(
                      "absolute inset-0 transform-gpu fill-transparent text-red-500 transition-all",
                      isAnimating && "!scale-[12] !fill-red-600"
                    )}
                  />
                  <span
                    className={classNames(
                      "ring-6 absolute top-0 left-[-.5px] z-10 h-4 w-4 transform-gpu rounded-full ring-inset ring-gray-50 transition-all duration-300",
                      isAnimating ? "scale-150 !ring-0" : "scale-0"
                    )}
                  ></span>
                  <HeartFilledIcon
                    className={classNames(
                      "ease-spring absolute inset-0 z-10 transform-gpu text-gray-50 transition-transform delay-200 duration-300",
                      isAnimating ? "scale-1" : "scale-0"
                    )}
                  />
                </>
              )}
            </span>

            <span
              className={classNames(
                "text-primary relative z-10 pl-1 text-xs tabular-nums",
                isAnimating && "text-gray-50 transition-colors duration-100",
                isLikedByCurrentUser && "dark:text-primary text-white"
              )}
            >
              {likeCount}
            </span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          sideOffset={4}
          className={classNames(
            "max-w-[260px] rounded bg-primary px-3 py-1.5 shadow-lg sm:max-w-sm",
            likeCount === 0 && "hidden"
          )}
        >
          <p className="text-sm">
            {likedBy
              .slice(0, MAX_LIKED_BY_SHOWN)
              .map((item) =>
                item.user.id === session?.user.id ? "You" : item.user.name
              )
              .join(", ")}
            {likeCount > MAX_LIKED_BY_SHOWN &&
              ` and ${likeCount - MAX_LIKED_BY_SHOWN} more`}
          </p>
          <Tooltip.Arrow
            offset={22}
            className="fill-gray-50 dark:fill-gray-800"
          />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
