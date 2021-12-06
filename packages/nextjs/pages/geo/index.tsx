import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export default function Geo({ country, city }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <pre>country: {country || 'Unknown'}</pre>  
        <pre>city: {city || 'Unknown'}</pre>  
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ country: string, city: string }> = async (context) => {
  const country = context.res.getHeader('x-pjlangley-country')
  const city = context.res.getHeader('x-pjlangley-city')

  console.log('country', country)
  console.log('city', city)

  return {
    props: {
      country: String(country),
      city: String(city),
    }
  }
}
