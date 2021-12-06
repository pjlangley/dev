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
        <pre>country: {country}</pre>  
        <pre>city: {city}</pre>  
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ country: string, city: string }> = async (context) => {
  const country = context.res.getHeader('x-pjlangley-country')
  const city = context.res.getHeader('x-pjlangley-city')

  return {
    props: {
      country: (typeof country === 'string' && country.length > 0) ? country : 'Unknown',
      city: (typeof city === 'string' && city.length > 0) ? city : 'Unknown',
    }
  }
}
