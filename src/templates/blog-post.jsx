import * as React from "react"
import { graphql } from "gatsby"

const BlogPostListTemplate = ({ data: { markdownRemark } }) => {
  return (
    <div>
      <header>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <h2>{markdownRemark.frontmatter.date}</h2>
      </header>
      <main dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </div>
  )
}

export default BlogPostListTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
