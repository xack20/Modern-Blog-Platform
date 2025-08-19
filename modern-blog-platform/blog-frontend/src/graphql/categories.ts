import { gql } from "@apollo/client";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    description
    postCount
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: String, $slug: String) {
    category(id: $id, slug: $slug) {
      ...CategoryFragment
      posts {
        id
        title
        slug
        excerpt
        featuredImage
        createdAt
        author {
          id
          username
          displayName
          avatar
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: String!
    $updateCategoryInput: UpdateCategoryInput!
  ) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
