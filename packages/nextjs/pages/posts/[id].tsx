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

      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      Post {postData.id} says{' '}
      &quot;{postData.content}&quot;.
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
