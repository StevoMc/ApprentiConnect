import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "components/layout/nav";
import Footer from "components/layout/footer";
import { Suspense } from "react";
import { ThemeProvider } from "components/providers/theme-provider";
import { ToastContainer } from "react-toastify";
import AuthStatus from "@/components/auth-status";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "ApprentiConnect",
  description:
    "ApprentiConnect: Connecting apprentices with mentors for career guidance and knowledge sharing.",
  metadataBase: new URL("https://fs223.de"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          cx(sfPro.variable, inter.variable),
          "bg-background dark:bg-background",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          <ToastContainer theme="dark" />
          <div className="background fixed z-[-10] h-screen w-full" />
          {/*  */}
          <Suspense fallback="Loading...">
            <AuthStatus />
            <Nav />
          </Suspense>
          <main className="z-[-1] flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
