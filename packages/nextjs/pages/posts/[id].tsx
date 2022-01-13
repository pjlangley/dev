import Layout from '../../components/layout'
import Head from 'next/head'
import posts from '../../lib/posts'

export type PostData = {
  id: string
  date: string
  title: string
  content: string 
}

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <h1 className='text-3xl'>
        {postData.title}
      </h1>
      <small>Post ID: {postData.id}</small>
      <br />
      <small>
        <time dateTime={postData.date}>{postData.date}</time>
      </small>

      <div className='pt-4 italic'>
        Post {postData.id} says{' '}
        &quot;{postData.content}&quot;.
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: false
  }
}

type Params = {
  id: string
}

export async function getStaticProps({ params }: { params: Params }) {
  let postData

  if (params.id === '1') {
    postData = posts.find((post) => post.id === '1')
  } else {
    postData = posts.find((post) => post.id === '2')
  }

  return {
    props: {
      postData
    }
  }
}
