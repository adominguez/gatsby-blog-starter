import * as React from "react"
import { Link } from "gatsby"

const BlogPostListTemplate = ({ pageContext }) => {
  const { posts } = pageContext

  return (
    <ul aria-label={"Blog posts"}>
      {posts.map(post => (
        <li key={post.fields.slug}>
          <Link to={`posts${post.fields.slug}`}>{post.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogPostListTemplate
