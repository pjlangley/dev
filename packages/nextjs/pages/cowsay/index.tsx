import Head from 'next/head'
import { useContext, useState } from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { ThemeContext } from '../../lib/theme'

export default function Cowsay({ cowsay }: { cowsay: string }) {
  const theme = useContext(ThemeContext)
  const [titleColour, setTitleColour] = useState('')

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <pre>
        {cowsay}
      </pre>

      <fieldset>
        <button type='button' onClick={() => setTitleColour(theme.pages.cowsay.title)}>
          Tell me the name of the title colour
        </button>
        <pre>{titleColour}</pre>
      </fieldset>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}cowsay`)
  const data = await res.json()

  return {
    props: {
      cowsay: data.cowsay,
    },
    revalidate: 10,
  }
}
