import * as React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Pagination } from "../components/pagination"

const BlogPostListTemplate = ({ data, pageContext }) => {
  const { authorsJson: author } = data
  const { posts, pageIndex, pageCount } = pageContext

  const userImgSrc = author.profilePic.childImageSharp.largeSize.src

  return (
    <div>
      <SEO
        title={author.name}
        description={`The profile page for ${author.name}`}
        meta={[
          {
            property: `og:type`,
            content: `profile`,
          },
          {
            property: `profile:first_name`,
            content: author.firstName,
          },
          {
            property: `profile:last_name`,
            content: author.lastName,
          },
          {
            property: "profile:username",
            content: author.id,
          },
        ]}
      />
      <header>
        <h1>{author.name}</h1>
        <img src={userImgSrc} alt={`${author.name} profile picture`} />
        <ul aria-label={`${author.name}'s Social Media Accounts`}>
          <li>
            <a href={`https://twitter.com/${author.socials.twitter}`}>
              Twitter
            </a>
          </li>
          <li>
            <a href={`https://twitter.com/${author.socials.website}`}>
              Website
            </a>
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
        <Pagination
          pageCount={pageCount}
          pageIndex={pageIndex}
          rootPath={`/authors/${author.id}`}
          pagePath={`/authors/${author.id}/page`}
        />
      </main>
    </div>
  )
}

export default BlogPostListTemplate

export const pageQuery = graphql`
  query AuthorById($authorId: String!) {
    authorsJson(id: { eq: $authorId }) {
      id
      name
      firstName
      lastName
      profilePic {
        childImageSharp {
          largeSize: fixed(width: 500) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      socials {
        twitter
        website
      }
    }
  }
`
