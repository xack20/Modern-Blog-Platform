import { gql } from "@apollo/client";

export const TAG_FRAGMENT = gql`
  fragment TagFragment on Tag {
    id
    name
    slug
    description
    postCount
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const GET_TAG = gql`
  query GetTag($id: String, $slug: String) {
    tag(id: $id, slug: $slug) {
      ...TagFragment
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
  ${TAG_FRAGMENT}
`;

export const CREATE_TAG = gql`
  mutation CreateTag($createTagInput: CreateTagInput!) {
    createTag(createTagInput: $createTagInput) {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: String!, $updateTagInput: UpdateTagInput!) {
    updateTag(id: $id, updateTagInput: $updateTagInput) {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: String!) {
    deleteTag(id: $id) {
      id
    }
  }
`;
