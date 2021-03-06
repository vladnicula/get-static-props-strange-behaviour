import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface HomePageServerProps {
  posts: { data: PostData[] }
}

const Home: NextPage<HomePageServerProps> = (props) => {

    console.log("Running Homepage Render")

    return (
        <div className={styles.container}>
            <h2>Posts list</h2>
            <ul>
                {props.posts.data.map((post) => {
                    return (
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a href={`/posts/${post.id}`}>
                                    {post.attributes.Title}
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

type PostData = {
  attributes: {
      Content: string;
      Title: string;
      createdAt: string;
      publishDate: null;
      publishedAt: string;
      updatedAt: string;
  };
  id: number;
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const res = await fetch(`${process.env.HEADLESS_CMS_URL}/api/posts`, {
            headers: {
                "Authorization": `Bearer ac9c9c1a41c06acdc25ac0a3b76cc763852683d3b325a633d2a45b6720e5b37603d8a12bd15af3eda9ff97a435a48f3ab0a302d23b8d2dfe57b2018d7be2ee13db26ed0241fbf07457c5c4cb4d7568aeb195c436b4be2aeb151571abfd6e8dd41e366d33d04c415ec7c2719e789927bafa69605ef9be5655cc326e20972dff62`
            }
        })

        const posts = await res.json()

        return {
            props: {
                posts
            },
        }
    } catch (err) {
        console.log("SHOULD LOG BUILD ERROR", err)
        return {
            props: { 
                posts: []
            },
            revalidate: 60
        }
    }

    
}

export default Home
