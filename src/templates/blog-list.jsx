import * as React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import ReactPaginate from "react-paginate"
import { navigate } from "gatsby"

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
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={pageIndex}
        onPageChange={({ selected: pageNum }) => {
          if (pageNum <= 0) {
            navigate('/');
            return;
          }
          navigate(`/page/${pageNum + 1}`)
        }}
        hrefBuilder={pageIndexPlusOne => {
          if (pageIndexPlusOne <= 1) return "/"
          return `/page/${pageIndexPlusOne}`
        }}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default BlogPostListTemplate
