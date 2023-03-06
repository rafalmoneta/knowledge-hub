import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../../components/button";
import {
  Dialog,
  DialogActions,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/dialog";
import { trpc } from "@/utils/api";
import { getPostQueryKey } from "@/hooks/useLikeUnlike";

const ConfirmDeleteCommentDialog = ({
  postId,
  commentId,
  isOpen,
  onClose,
}: {
  postId: string;
  commentId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const client = useQueryClient();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const deleteCommentMutation = trpc.comment.delete.useMutation({
    onSuccess: () => {
      return client.invalidateQueries({
        queryKey: getPostQueryKey(postId),
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose} initialFocus={cancelRef}>
        <DialogContent>
          <DialogTitle>Delete comment</DialogTitle>

          <DialogDescription className="mt-6">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>

          <DialogCloseButton onClick={onClose} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="secondary"
            className="!text-red-500"
            isLoading={deleteCommentMutation.isLoading}
            loadingChildren="Deleting comment"
            onClick={() => {
              deleteCommentMutation.mutate(
                { id: commentId },
                {
                  onSuccess: () => onClose(),
                }
              );
            }}
          >
            Delete comment
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteCommentDialog;
