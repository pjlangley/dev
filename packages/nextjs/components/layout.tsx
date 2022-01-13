import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeContext } from "../lib/theme";
import { useContext } from "react";

const title = "pjlangley on Next.js";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  return (
    <div className="font-serif dark bg-teal-900 h-screen text-center pt-3">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <header className="pb-6">
        {home ? (
          <>
            <Image
              priority
              src="https://placekitten.com/300/300"
              height={144}
              width={144}
              alt={title}
              className="rounded-full"
            />
            <h1 className="text-3xl">{title}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="https://placekitten.com/250/250"
                  height={108}
                  width={108}
                  alt={title}
                  className="rounded-full"
                />
              </a>
            </Link>
            <h2>
              <Link href="/">
                <a
                  className="text-lg hover:underline"
                  style={{
                    color:
                      router.pathname == "/cowsay"
                        ? theme.pages.cowsay.title
                        : theme.default.title,
                  }}
                >
                  {title}
                </a>
              </Link>
            </h2>
          </>
        )}
      </header>

      <main>{children}</main>

      {!home && (
        <div className="pt-6">
          <Link href="/">
            <a className="hover:underline">← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
