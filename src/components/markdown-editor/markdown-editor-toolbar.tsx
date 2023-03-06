import { BoldIcon, ItalicIcon, LinkIcon, ListIcon } from "../icons";

const TOOLBAR_ITEMS = [
  {
    commandTrigger: "bold",
    icon: <BoldIcon className="h-4 w-4" />,
    name: "Bold",
  },
  {
    commandTrigger: "italic",
    icon: <ItalicIcon className="h-4 w-4" />,
    name: "Italic",
  },
  {
    commandTrigger: "unordered-list",
    icon: <ListIcon className="h-4 w-4" />,
    name: "Unordered List",
  },
  {
    commandTrigger: "link",
    icon: <LinkIcon className="h-4 w-4" />,
    name: "Link",
  },
];

export default TOOLBAR_ITEMS;
