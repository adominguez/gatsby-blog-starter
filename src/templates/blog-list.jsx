import * as React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const BlogPostListTemplate = ({ pageContext }) => {
  const { posts } = pageContext

  return (
    <div>
      <SEO
        title={"Homepage"}
        meta={[
          {
            property: `og:type`,
            content: `website`,
          },
        ]}
      />
      <ul aria-label={"Blog posts"}>
        {posts.map(post => {
          const authorNames = post.frontmatter.authors
            .map(author => author.name)
            .join(", ")
          return (
            <li key={post.fields.slug}>
              <Link to={`posts${post.fields.slug}`}>
                {post.frontmatter.title} by {authorNames}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogPostListTemplate
