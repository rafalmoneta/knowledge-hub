import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { ButtonLink } from "../../components/button-link";
import { DateField } from "../../components/date-field";
import { MarkdownIcon } from "../../components/icons";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";
import { TextField } from "../../components/text-field";

type FormValues = {
  title: string;
  startDate: Date;
  speaker?: {
    id: string;
    name: string | null;
    image: string | null;
  };
  location: string;
  meeting?: string | null;
  resources?: string | null;
  description: string;
  summary?: string | null;
};

type PostFormProps = {
  defaultValues?: FormValues;
  isSubmitting?: boolean;
  backTo: string;
  onSubmit: SubmitHandler<FormValues>;
};

export function EventForm({
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
        label="Title of the Event"
        autoFocus
        required
        className="mb-6 !py-1.5 !text-lg font-semibold"
      />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <TextField
            {...register("speaker")}
            label="Speaker (tbd dropdown)"
            autoFocus
            // required
            placeholder="Creator of the Event is the speaker"
            className="mb-6 !py-1.5 !text-lg disabled:hover:cursor-not-allowed"
            disabled
          />
        </div>
        <div className="flex-1">
          <DateField
            {...register("startDate", { required: true })}
            label="Start Date"
            autoFocus
            required
            className="mb-6 !py-1.5 !text-lg"
          />
        </div>
      </div>

      <TextField
        {...register("location", { required: true })}
        label="Location"
        autoFocus
        required
        className="mb-6 !py-1.5 !text-lg"
      />

      <TextField
        {...register("meeting", { required: true })}
        label="Link to the Google or Zoom Meeting"
        autoFocus
        required
        type="url"
        className="mb-6 !py-1.5 !text-lg"
      />

      <TextField
        {...register("resources", { required: true })}
        label="Resources (link to the Google Drive folder)"
        autoFocus
        required
        type="url"
        className="mb-6 !py-1.5 !text-lg"
      />

      <div className="mt-6">
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MarkdownEditor
              label="Description"
              value={field.value}
              onChange={field.onChange}
              onTriggerSubmit={handleSubmit(onSubmit)}
              minRows={4}
              required
            />
          )}
        />
      </div>

      <div className="mt-6">
        <Controller
          name="summary"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MarkdownEditor
              label="Summary of the Event"
              value={field.value}
              onChange={field.onChange}
              onTriggerSubmit={handleSubmit(onSubmit)}
              minRows={10}
            />
          )}
        />
      </div>

      {/* <div>
        <p>Generated Google Calendar Event link: </p>
        <p>To bo done</p>
      </div> */}

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
