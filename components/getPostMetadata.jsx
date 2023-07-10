import fs from 'fs'
import matter from "gray-matter"

const getPostMetadata = () => {
    const folder = "./posts/"
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter((file) => file.endsWith(".md"))
    const posts = markdownPosts.map((fileName) => {
        const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8")
        const matterResult = matter(fileContents)
        return{
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            thumbnailImage: matterResult.data.image,
            introduction: matterResult.data.introduction,
            category: matterResult.data.category,
            chapter: matterResult.data.lessonChapter,
            number: matterResult.data.lessonNumber,
            slug: fileName.replace(".md", ""),
        }
    })
    // const slugs = markdownPosts.map((file) => file.replace(".md", ""))
    // return slugs
    return posts;
}

export default getPostMetadata