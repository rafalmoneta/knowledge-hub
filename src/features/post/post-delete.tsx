import React from "react";
import { trpc } from "@/utils/api";
import {
  Dialog,
  DialogActions,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/dialog";
import { Button } from "../../components/button";
import { useRouter } from "next/router";

const ConfirmDeletePostDialog = ({
  postId,
  isOpen,
  onClose,
}: {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const deletePostMutation = trpc.post.delete.useMutation({
    async onSuccess() {
      await router.push(`/`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose} initialFocus={cancelRef}>
        <DialogContent>
          <DialogTitle>Delete Post</DialogTitle>

          <DialogDescription className="mt-6">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>

          <DialogCloseButton onClick={onClose} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="secondary"
            className="!text-red-500"
            isLoading={deletePostMutation.isLoading}
            loadingChildren="Deleting post"
            onClick={() => {
              deletePostMutation.mutate({ id: postId });
            }}
          >
            Delete Post
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeletePostDialog;
