import React from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import type { TextareaMarkdownRef } from "textarea-markdown-editor";
import TextareaMarkdown from "textarea-markdown-editor";
import TextareaAutosize from "react-textarea-autosize";
import { classNames } from "@/lib/classnames";
import TOOLBAR_ITEMS from "./markdown-editor-toolbar";
import { Switch } from "@headlessui/react";
import MarkdownPreview from "./markdown-editor-preview";

type MarkdownEditorProps = {
  label?: string;
  value: string | undefined;
  minRows?: number;
  onChange: (value: string) => void;
  onTriggerSubmit?: () => void;
} & Omit<
  TextareaAutosizeProps,
  "value" | "onChange" | "onKeyDown" | "onInput" | "onPaste" | "onDrop"
>;

export const MarkdownEditor = ({
  label,
  value = "",
  minRows = 15,
  onChange,
  // onTriggerSubmit,
  ...restProps
}: MarkdownEditorProps) => {
  const textareaMarkdownRef = React.useRef<TextareaMarkdownRef>(null);
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div>
      {label && <label className="mb-2 block font-semibold">{label}</label>}
      <div>
        <div className="flex items-center justify-between gap-4 rounded border bg-primary px-4 py-px">
          <div className="-ml-2 flex gap-2">
            {TOOLBAR_ITEMS.map((toolbarItem) => (
              <button
                key={toolbarItem.commandTrigger}
                title={toolbarItem.name}
                type="button"
                onClick={() => {
                  textareaMarkdownRef.current?.trigger(
                    toolbarItem.commandTrigger
                  );
                }}
                className={classNames(
                  "focus-ring inline-flex h-8 w-8 items-center justify-center rounded focus:border disabled:cursor-default disabled:opacity-50",
                  !showPreview && "hover:text-blue transition-colors"
                )}
                disabled={showPreview}
              >
                {toolbarItem.icon}
              </button>
            ))}
          </div>
          <Switch.Group as="div" className="flex items-center">
            <Switch
              checked={showPreview}
              onChange={(value: boolean) => {
                if (value === false) {
                  textareaMarkdownRef.current?.focus();
                }
                setShowPreview(value);
              }}
              className={classNames(
                showPreview ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700",
                "focus-ring relative inline-flex h-[18px] w-8 flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out"
              )}
            >
              <span
                className={classNames(
                  showPreview ? "translate-x-4" : "translate-x-0.5",
                  "inline-block h-3.5 w-3.5 translate-y-0.5 transform rounded-full bg-white transition-transform duration-200 ease-in-out dark:bg-gray-100"
                )}
              />
            </Switch>

            <Switch.Label className="ml-2 cursor-pointer select-none text-xs">
              Preview
            </Switch.Label>
          </Switch.Group>
        </div>

        <div className={classNames("relative mt-2", showPreview && "sr-only")}>
          <TextareaMarkdown.Wrapper ref={textareaMarkdownRef}>
            <TextareaAutosize
              value={value}
              minRows={minRows}
              onChange={(event) => {
                onChange(event.target.value);
              }}
              className="focus-ring block w-full rounded border border-secondary bg-secondary p-2 shadow-sm"
              {...restProps}
            />
          </TextareaMarkdown.Wrapper>
        </div>
        {showPreview && <MarkdownPreview markdown={value} />}
      </div>
    </div>
  );
};
