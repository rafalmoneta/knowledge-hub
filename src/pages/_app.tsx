import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { trpc } from "@/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";
import { primaryFont, secondaryFont } from "@/lib/fonts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {/* TODO: Create wrapper for managin next/fonts */}
      <div
        className={`${primaryFont.variable} ${secondaryFont.variable} font-sans`}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </div>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
