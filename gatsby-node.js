/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postList = path.resolve(`./src/templates/blog-list.jsx`)
  const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              excerpt(pruneLength: 160)
              frontmatter {
                title
                authors {
                  name
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.map(post => post.node)

    createPage({
      path: `/`,
      component: postList,
      context: {
        posts,
      },
    })

    posts.forEach(post => {
      createPage({
        path: `posts${post.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.fields.slug,
        },
      })
    })

    return null
  })
}
