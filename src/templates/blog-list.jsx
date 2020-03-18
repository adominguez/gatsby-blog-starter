import * as React from 'react';

const BlogPostListTemplate = ({ pageContext }) => {
  const { posts } = pageContext;

  return (
      <ul aria-label={"Blog posts"}>
        {
          posts.map(post =>
            <li key={post.fields.slug}>{post.excerpt}</li>)
        }
      </ul>
  );
};

export default BlogPostListTemplate;
