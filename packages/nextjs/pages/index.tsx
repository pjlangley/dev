import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { PostData } from './posts/[id]'
import posts from '../lib/posts'

type AllPostData = Omit<PostData, 'content'>[]

export default function Home({ allPostsData }: { allPostsData: AllPostData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='pb-6'>
        <p className='pb-4'>Sample website using Next.js.</p>
        <h2 className='pb-2 text-xl'>Pages</h2>
        <ul>
          <li>
            <Link href="/geo"><a className='underline'>geo</a></Link>
            {' '}(uses middleware)
          </li>
          <li>
            <Link href="/cowsay"><a className="underline">cowsay</a></Link>
            {' '}(uses API endpoint)
          </li>
        </ul>
      </section>
      <section>
        <h3 className='text-xl'>Blog</h3>
        <ul className='pt-3'>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className='pb-2'>
              <Link href={`/posts/${id}`}>
                <a className='underline'>{title}</a>
              </Link>
              <br />
              <small>
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
