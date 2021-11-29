import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'

export type PostData = {
  id: string
  date: string
  title: string
  contentHtml: string 
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
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

type Params = {
  id: string
}

export async function getStaticProps({ params }: { params: Params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
