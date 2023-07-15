import Markdown from "markdown-to-jsx"
import matter from "gray-matter"
import getPostMetadata from "../../../components/getPostMetadata"
import getPostContent from "../../../components/getPostContent"
import Chat from "../../../components/chat"

export const generateStaticParams = async() => {
    const posts = getPostMetadata()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default function Page(props){
    const slug = props.params.slug
    const post = getPostContent(slug)
    return (
        <main>
            <div className="flex justify-center items-center">
                <div className="max-w-[800px] w-[85%]">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-5xl color_primary my-[40px]">{post.data.title}</h1>
                        <article class="prose md:prose-lg lg:prose-xl prose-a:text-primary prose-blockquote:text-gray-300 prose-headings:text-gray-300 prose-code:text-primary text-gray-200">
                            <Markdown >{post.content}</Markdown>
                        </article>
                        
                    </div>
                </div>
            </div>
            <Chat classes="flex justify-center" lessonContent={post.content} lessonTitle={post.data.title}/>
        </main>
    )
}