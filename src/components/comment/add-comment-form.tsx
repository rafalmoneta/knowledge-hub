import { getPostQueryKey } from "@/hooks/useLikeUnlike";
import { trpc } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../button";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";

type CommentFormData = {
  content: string;
};

const AddCommentForm = ({ postId }: { postId: string }) => {
  const client = useQueryClient();
  const { handleSubmit, control, reset } = useForm<CommentFormData>();
  const addCommentMutation = trpc.comment.add.useMutation({
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
    addCommentMutation.mutate(
      { postId, content: data.content },
      { onSuccess: () => reset({ content: "" }) }
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
      <div className="mt-4">
        <Button
          type="submit"
          isLoading={addCommentMutation.isLoading}
          loadingChildren="Adding comment"
        >
          Add comment
        </Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
