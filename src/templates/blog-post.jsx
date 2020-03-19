import * as React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"

const BlogPostListTemplate = ({ data: { markdownRemark } }) => {
  const authors = markdownRemark.frontmatter.authors
  const authorNames = authors.map(author => author.name).join(", ")
  return (
    <div>
      <SEO
        title={markdownRemark.frontmatter.title}
        description={markdownRemark.frontmatter.description}
        meta={[
          {
            property: `og:type`,
            content: `article`,
          },
          {
            property: `article:published_time`,
            content: markdownRemark.frontmatter.date,
          },
          {
            property: "article:author",
            content: markdownRemark.frontmatter.authors.map(
              author => author.id
            ),
          },
          {
            property: "article:tag",
            content: markdownRemark.frontmatter.tags,
          },
        ]}
      />
      <header>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <Link to={`/authors/${authors[0].id}`}>
          <h2>By {authorNames}</h2>
        </Link>
        <h3>{markdownRemark.frontmatter.date}</h3>
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
        description
        tags
        date(formatString: "MMMM DD, YYYY")
        authors {
          name
          id
        }
      }
    }
  }
`
