import * as React from "react"
import { graphql } from "gatsby"

const BlogPostListTemplate = ({ data: { markdownRemark } }) => {
  return (
    <div>
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
    }
  }
`
