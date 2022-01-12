import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { PostData } from './posts/[id]'
import posts from '../lib/posts'

type AllPostData = Omit<PostData, 'content'>[]

export default function Home({ allPostsData }: { allPostsData: AllPostData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Sample website using Next.js.</p>
        <p>Pages:</p>
        <ul>
          <li>
            <Link href="/geo"><a>geo</a></Link>
            {' '}(uses middleware)
          </li>
          <li>
            <Link href="/cowsay">cowsay</Link>
            {' '}(uses API endpoint)
          </li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = posts.map((post) => ({
    id: post.id,
    title: post.title,
    date: post.date,
  }))

  return {
    props: {
      allPostsData
    }
  }
}
