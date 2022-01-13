import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { InferGetServerSidePropsType } from "next";
import { wrapper, nextjsSlice } from "../../lib/store";

export default function Geo({
  country,
  city,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <pre>country: {country || "Unknown"}</pre>
        <pre>city: {city || "Unknown"}</pre>
      </section>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<{
  country: string;
  city: string;
}>((store) => async (context) => {
  console.log("context.query.country", context.query.country);
  console.log("context.query.city", context.query.city);

  store.dispatch(nextjsSlice.actions.setCountry(String(context.query.country)));
  store.dispatch(nextjsSlice.actions.setCity(String(context.query.city)));

  const country = context.query.country;
  const city = context.query.city;

  return {
    props: {
      country: String(country),
      city: String(city),
    },
  };
});
