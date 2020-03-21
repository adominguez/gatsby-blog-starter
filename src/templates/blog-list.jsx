import * as React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import ReactPaginate from "react-paginate"
import { navigate } from "gatsby"
import { Pagination } from "../components/pagination"

const BlogPostListTemplate = ({ pageContext }) => {
  const { posts, pageIndex, pageCount } = pageContext

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
      <Pagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        rootPath={"/"}
        pagePath={"/page"}
      />
    </div>
  )
}

export default BlogPostListTemplate
