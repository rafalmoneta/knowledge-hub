import React from "react";
import type { RouterOutputs } from "@/utils/api";
import { classNames } from "@/lib/classnames";
import Link from "next/link";
import { AuthorSmall } from "../../components/author";
import { HtmlView } from "../../components/html-view";
import { createPostCardContent } from "@/lib/text";
import { ChevronRightIcon } from "../../components/icons";

type PostCardProps = {
  post: RouterOutputs["post"]["feed"]["posts"][number];
  hideAuthor?: boolean;
};

export const PostCard = ({ post, hideAuthor = false }: PostCardProps) => {
  const { content, hasMore } = React.useMemo(
    () => createPostCardContent(post.contentHtml),
    [post.contentHtml]
  );

  return (
    <div>
      <div className={classNames("")}>
        <Link href={`/post/${post.id}`}>
          <h1 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            {post.title}
          </h1>
        </Link>

        <div className={classNames(hideAuthor ? "mt-2" : "mt-6")}>
          {hideAuthor ? (
            <p>
              <time dateTime={post.createdAt.toISOString()}>
                {post.createdAt.toLocaleDateString("en-US", {})}
              </time>
            </p>
          ) : (
            <AuthorSmall author={post.author} date={post.createdAt} />
          )}
        </div>

        <HtmlView
          html={content}
          className={classNames(hideAuthor ? "mt-4" : "mt-6")}
        />

        <div className="clear-both mt-4 flex items-center gap-4">
          {hasMore && (
            <Link
              href={`/post/${post.id}`}
              className="inline-flex items-center font-medium transition-colors"
            >
              Continue reading <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
