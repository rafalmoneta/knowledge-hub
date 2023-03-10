import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { ButtonLink } from "../../components/button-link";
import { MarkdownIcon } from "../../components/icons";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";
import { TextField } from "../../components/text-field";

type FormValues = {
  title: string;
  content: string;
};

type PostFormProps = {
  defaultValues?: FormValues;
  isSubmitting?: boolean;
  backTo: string;
  onSubmit: SubmitHandler<FormValues>;
};

export function PostForm({
  defaultValues,
  isSubmitting,
  backTo = "/",
  onSubmit,
}: PostFormProps) {
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("title", { required: true })}
        label="Title of the post"
        autoFocus
        required
        className="!py-1.5 !text-lg font-semibold"
      />

      <div className="mt-6">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MarkdownEditor
              label="Post"
              value={field.value}
              onChange={field.onChange}
              onTriggerSubmit={handleSubmit(onSubmit)}
              required
            />
          )}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingChildren={`${defaultValues ? "Saving" : "Publishing"}`}
          >
            {defaultValues?.title ? "Save" : "Publish"}
          </Button>

          <ButtonLink href={backTo} variant="secondary">
            Cancel
          </ButtonLink>
        </div>
        {!isSubmitting && (
          <a
            href="https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-blue flex items-center gap-2 transition-colors"
          >
            <MarkdownIcon className="opacity-70" />
            <span className="text-xs">Markdown supported</span>
          </a>
        )}
      </div>
    </form>
  );
}
