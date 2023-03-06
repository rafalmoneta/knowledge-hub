import { markdownToHtml } from "@/lib/editor";
import { HtmlView } from "../html-view";

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <div className="mt-8 border-b pb-6">
      {markdown ? (
        <HtmlView html={markdownToHtml(markdown)} />
      ) : (
        <p>Nothing to preview</p>
      )}
    </div>
  );
}
