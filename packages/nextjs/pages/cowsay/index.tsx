import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'

export default function Cowsay({ cowsay }: { cowsay: string }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <pre>
        {cowsay}
      </pre>
    </Layout>
  )
}

// export async function getStaticProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}cowsay`)
//   const data = await res.json()

//   return {
//     props: {
//       cowsay: data.cowsay,
//     },
//     revalidate: 10,
//   }
// }
