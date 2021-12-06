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
  console.log('context.query.country', context.query.country)
  console.log('context.query.city', context.query.city)

  const country = context.query.country
  const city = context.query.city

  return {
    props: {
      country: String(country),
      city: String(city),
    }
  }
}
