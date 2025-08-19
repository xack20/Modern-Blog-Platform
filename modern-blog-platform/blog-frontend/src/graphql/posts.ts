import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query Posts($status: PostStatus, $categoryId: ID, $tagId: ID, $limit: Int, $offset: Int) {
    posts(status: $status, categoryId: $categoryId, tagId: $tagId, limit: $limit, offset: $offset) {
      id
      title
      slug
      excerpt
      featuredImage
      status
      views
      author {
        id
        username
        profile {
          avatar
        }
      }
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      createdAt
      publishedAt
    }
  }
`;

export const POST_QUERY = gql`
  query Post($id: ID, $slug: String) {
    post(id: $id, slug: $slug) {
      id
      title
      slug
      content
      excerpt
      featuredImage
      status
      seoTitle
      seoDescription
      views
      author {
        id
        username
        email
        profile {
          bio
          avatar
          website
          twitter
          github
          linkedin
        }
      }
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      comments {
        id
        content
        status
        author {
          id
          username
          profile {
            avatar
          }
        }
        createdAt
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const FEATURED_POSTS_QUERY = gql`
  query FeaturedPosts($limit: Int) {
    featuredPosts(limit: $limit) {
      id
      title
      slug
      excerpt
      featuredImage
      author {
        id
        username
        profile {
          avatar
        }
      }
      category {
        id
        name
        slug
      }
      createdAt
      publishedAt
    }
  }
`;

export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($query: String!, $limit: Int) {
    searchPosts(query: $query, limit: $limit) {
      id
      title
      slug
      excerpt
      featuredImage
      author {
        id
        username
      }
      category {
        id
        name
        slug
      }
      createdAt
      publishedAt
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      slug
      status
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      slug
      status
    }
  }
`;

export const PUBLISH_POST_MUTATION = gql`
  mutation PublishPost($id: ID!) {
    publishPost(id: $id) {
      id
      status
      publishedAt
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
