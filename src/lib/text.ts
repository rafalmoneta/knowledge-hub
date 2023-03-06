export function capitalize(string: string) {
  if (!string) return string;
  return string[0].toUpperCase() + string.substring(1);
}

export function createPostCardContent(html: string) {
  const contentDocument = new DOMParser().parseFromString(html, "text/html");
  const tagsForSummary = ["p", "img", "ul", "ol", "pre"];

  let firstElement;

  for (const tag of tagsForSummary) {
    firstElement = contentDocument.querySelector(tag);
    if (firstElement) break;
  }

  if (firstElement) {
    if (
      firstElement.textContent &&
      firstElement.textContent.length < 20 &&
      firstElement.nextElementSibling
    ) {
      return {
        content:
          firstElement.outerHTML + firstElement.nextElementSibling.outerHTML,
        hasMore: contentDocument.body.children.length > 2,
      };
    } else {
      return {
        content: firstElement.outerHTML,
        hasMore: contentDocument.body.children.length > 1,
      };
    }
  } else {
    return { content: "<p>Summary couldn't be generated</p>", hasMore: false };
  }
}
