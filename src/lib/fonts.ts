import { Inter, Poppins } from "@next/font/google";

export const primaryFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const secondaryFont = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
