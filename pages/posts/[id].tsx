import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface PostPageServerProps {
    post?: {data: PostData}
}

const Post: NextPage<PostPageServerProps> = (props) => {
    console.log(
        `\nRunning Post Render. Print stringified props \n\n ${JSON.stringify(props, null, 2)}`
    )
    
    return (
        <div>
            {JSON.stringify(props.post, null, 2)}
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

export const getStaticProps: GetStaticProps = async (context) => {
    console.log(`running getStaticProps posts/[id]`)
    const { id } = context.params ?? {}
    const res = await fetch(`${process.env.HEADLESS_CMS_URL}/api/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ac9c9c1a41c06acdc25ac0a3b76cc763852683d3b325a633d2a45b6720e5b37603d8a12bd15af3eda9ff97a435a48f3ab0a302d23b8d2dfe57b2018d7be2ee13db26ed0241fbf07457c5c4cb4d7568aeb195c436b4be2aeb151571abfd6e8dd41e366d33d04c415ec7c2719e789927bafa69605ef9be5655cc326e20972dff62`
        }
    })

    const post = await res.json()

    console.log("getStaticProps fetched post data", post)

    return {
        props: {
            post
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    console.log("getStaticPaths posts/[id]", {
        paths: [],
        fallback: true,
    })
    
    return {
        paths: [],
        fallback: true,
    }
}

export default Post
