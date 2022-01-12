import randomstring from 'randomstring'

const posts = [
  {
    id: '1',
    title: 'Post One',
    date: '2022-01-10',
    content: randomstring.generate({ charset: 'pjlangley' }),
  },
  {
    id: '2',
    title: 'Post Two',
    date: '2022-01-13',
    content: randomstring.generate({ charset: 'kitten' }),
  },
]

export default posts
