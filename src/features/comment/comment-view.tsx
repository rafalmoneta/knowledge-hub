import React from "react";
import type { RouterOutputs } from "@/utils/api";
import { Avatar } from "../../components/avatar";
import EditCommentForm from "./comment-edit-form";
import { useSession } from "next-auth/react";
import { AuthorSmall } from "../../components/author";
import { HtmlView } from "../../components/html-view";
import { Menu } from "@headlessui/react";
import {
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItemsContent,
} from "../../components/menu";
import { IconButton } from "../../components/icon-button";
import ConfirmDeleteCommentDialog from "./comment-delete";

const Comment = ({
  postId,
  comment,
}: {
  postId: string;
  // TODO: Fix type
  comment: RouterOutputs["comment"]["get"];
}) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const isUserAuthor = session?.user?.id === comment?.author.id;

  if (!comment) return null;

  if (isEditing) {
    return (
      <div className="flex items-center gap-4">
        <Avatar
          name={comment.author.name || "Anonymous"}
          src={comment.author.image}
        />
        <EditCommentForm
          postId={postId}
          comment={comment}
          onDone={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <AuthorSmall author={comment.author} date={comment?.createdAt} />
        {isUserAuthor ? (
          <div className="relative">
            {isUserAuthor ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="secondary"
                  className="relative"
                >
                  <span>...</span>
                </MenuButton>

                <MenuItems className="w-28">
                  <MenuItemsContent>
                    <MenuItemButton onClick={() => setIsEditing(true)}>
                      Edit
                    </MenuItemButton>
                    <MenuItemButton
                      className="!text-red-500"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      Delete
                    </MenuItemButton>
                  </MenuItemsContent>
                </MenuItems>
              </Menu>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-4 pl-11 sm:pl-16">
        <HtmlView html={comment.contentHtml} />
      </div>

      <ConfirmDeleteCommentDialog
        postId={postId}
        commentId={comment.id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Comment;
