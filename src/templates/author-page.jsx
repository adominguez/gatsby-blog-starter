import * as React from "react"
import { graphql, Link } from "gatsby"

const BlogPostListTemplate = ({ data, pageContext }) => {
  const { authorsJson: author } = data
  const { posts } = pageContext

  return (
    <div>
      <header>
        <h1>{author.name}</h1>
        <ul aria-label={`${author.name}'s Social Media Accounts`}>
          <li>
          <a href={`https://twitter.com/${author.socials.twitter}`}>Twitter</a>
          </li>
          <li>
            <a href={`https://twitter.com/${author.socials.website}`}>Website</a>
          </li>
        </ul>
      </header>
      <main>
        <h1 id="posts-header">Blog Posts</h1>
        <ul aria-describedby={`posts-header`}>
          {posts.map(post => {
            return (
              <li key={post.fields.slug}>
                <Link to={`posts${post.fields.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default BlogPostListTemplate

export const pageQuery = graphql`
  query AuthorById($authorId: String!) {
    authorsJson(id: { eq: $authorId }) {
      name
      socials {
        twitter
        website
      }
    }
  }
`
