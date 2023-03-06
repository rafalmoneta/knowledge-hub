import type { User } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "./avatar";

export type Author = Pick<User, "id" | "name" | "image">;

type AuthorProps = {
  author: Author;
  date?: Date;
  position?: string;
};

export function AuthorSmall({ author, date }: AuthorProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Link href={`/profile/${author.id}`} className="relative inline-flex">
        <span className="hidden sm:flex">
          <Avatar
            name={author?.name ? author.name : "author"}
            src={author.image}
          />
        </span>
        <span className="flex sm:hidden">
          <Avatar
            name={author?.name ? author.name : "author"}
            src={author.image}
            size="sm"
          />
        </span>
      </Link>
      <div className="flex-1 text-sm sm:text-base">
        <div>
          <Link
            href={`/profile/${author.id}`}
            className="hover:text-blue font-medium tracking-tight transition-colors"
          >
            {author.name}
          </Link>
        </div>

        <p className="text-secondary text-sm tracking-tight text-gray-500 dark:text-gray-400">
          <time dateTime={date.toISOString()}>{date.toISOString()}</time>
          {/* ago */}
        </p>
      </div>
    </div>
  );
}

export function Author({ author }: AuthorProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Link href={`/profile/${author.id}`} className="relative inline-flex">
        <span className="hidden sm:flex">
          <Avatar
            name={author?.name ? author.name : "author"}
            src={author.image}
          />
        </span>
        <span className="flex sm:hidden">
          <Avatar
            name={author?.name ? author.name : "author"}
            src={author.image}
            size="sm"
          />
        </span>
      </Link>
      <div className="flex-1 text-sm sm:text-base">
        <div>
          <Link
            href={`/profile/${author.id}`}
            className="hover:text-blue font-medium tracking-tight transition-colors"
          >
            {author.name}
          </Link>
        </div>

        <p className="text-secondary text-sm tracking-tight text-gray-500 dark:text-gray-400">
          Frontend Developer
        </p>
      </div>
    </div>
  );
}
