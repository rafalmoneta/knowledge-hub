// import { Avatar } from "@/components/avatar";
import { ButtonLink } from "@/components/button-link";
// import { Footer } from "@/components/footer";
import { IconButton } from "@/components/icon-button";
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItemLink,
  MenuItems,
  MenuItemsContent,
} from "@/components/menu";
import { capitalize } from "@/lib/text";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import { Avatar } from "./avatar";
import { SearchIcon } from "./icons";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const { theme, themes, setTheme } = useTheme();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);

  console.log(isSearchDialogOpen);

  return (
    <div className="px-6">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 py-12 md:py-20">
        <Link href="/">Home</Link>
        <div className="flex items-center gap-2 md:gap-4">
          <ButtonLink href="/people" variant="secondary">
            People
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Posts
          </ButtonLink>
          <ButtonLink href="/events" variant="secondary">
            Events
          </ButtonLink>
          <IconButton
            variant="secondary"
            onClick={() => {
              setIsSearchDialogOpen(true);
            }}
          >
            <SearchIcon className="text-primary h-4 w-4" />
          </IconButton>

          <Menu>
            <MenuButton className="focus-ring group relative inline-flex rounded-full">
              <Avatar
                name={session?.user.name ? session?.user.name : "Anonymous"}
                src={session?.user.image}
                size="sm"
              />
            </MenuButton>

            <MenuItems className="w-48">
              <MenuItemsContent>
                <MenuItemLink href={`/profile/${session?.user?.id as string}`}>
                  Profile
                </MenuItemLink>
                <MenuItemButton onClick={() => signOut()}>
                  Log out
                </MenuItemButton>
              </MenuItemsContent>
              <div className="flex items-center gap-4 rounded-b bg-secondary px-4 py-3">
                <label htmlFor="theme" className="text-sm">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={(event) => {
                    setTheme(event.target.value);
                  }}
                  className="block w-full rounded border border-secondary bg-primary py-1.5 text-xs shadow-sm"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {capitalize(theme)}
                    </option>
                  ))}
                </select>
              </div>
            </MenuItems>
          </Menu>

          <ButtonLink href="/new/post">
            <span className="sm:hidden">Post</span>
            <span className="hidden shrink-0 sm:block">New post</span>
          </ButtonLink>
        </div>
      </header>

      <main>{children}</main>

      <div className="py-20">{/* <Footer /> */}</div>
    </div>
  );
}
