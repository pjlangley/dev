import Head from "next/head";
import { useContext, useState } from "react";
import Layout, { siteTitle } from "../../components/layout";
import { ThemeContext } from "../../lib/theme";

export default function Cowsay({ cowsay }: { cowsay: string }) {
  const theme = useContext(ThemeContext);
  const [titleColour, setTitleColour] = useState("");

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="w-1/2 mr-auto ml-auto">
        <pre className="text-left">{cowsay}</pre>
      </div>

      <fieldset className="pt-6">
        <button
          type="button"
          onClick={() => setTitleColour(theme.pages.cowsay.title)}
          className="rounded-full bg-emerald-400 p-2 px-4 drop-shadow-md border-2 border-teal-300 hover:bg-emerald-300"
        >
          Reveal the title colour value
        </button>
        <pre className="text-emerald-200 pt-2">{titleColour}</pre>
      </fieldset>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}cowsay`);
  const data = await res.json();

  return {
    props: {
      cowsay: data.cowsay,
    },
    revalidate: 10,
  };
}
