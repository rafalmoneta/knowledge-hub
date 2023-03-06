import type { SubmitHandler } from "react-hook-form";
import type { RouterOutputs } from "@/utils/api";
import { getPostQueryKey } from "@/hooks/useLikeUnlike";
import { trpc } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../button";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";

type CommentFormData = {
  content: string;
};

const EditCommentForm = ({
  postId,
  comment,
  onDone,
}: {
  postId: string;
  comment: RouterOutputs["post"]["get"]["comments"][number];
  onDone: () => void;
}) => {
  const client = useQueryClient();
  const { handleSubmit, control } = useForm<CommentFormData>({
    defaultValues: {
      content: comment.content,
    },
  });
  const editCommentMutation = trpc.comment.edit.useMutation({
    onSuccess: () => {
      return client.invalidateQueries({
        queryKey: getPostQueryKey(postId),
      });
    },
    onError: (error) => {
      // TODO: Handle error and display it in toast
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    editCommentMutation.mutate(
      {
        id: comment.id,
        data: {
          content: data.content,
        },
      },
      { onSuccess: () => onDone() }
    );
  };

  return (
    <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MarkdownEditor
            value={field.value}
            onChange={field.onChange}
            onTriggerSubmit={handleSubmit(onSubmit)}
            required
            placeholder="Comment"
            minRows={4}
          />
        )}
      />
      <div className="mt-4 flex gap-4">
        <Button
          type="submit"
          isLoading={editCommentMutation.isLoading}
          loadingChildren="Adding comment"
        >
          Update Comment
        </Button>
        <Button type="submit" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditCommentForm;
