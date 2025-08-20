import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      role
      createdAt
      profile {
        id
        bio
        avatar
        website
        twitter
        github
        linkedin
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      role
      createdAt
      profile {
        bio
        avatar
        website
        twitter
        github
        linkedin
      }
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      username
      role
      createdAt
      profile {
        bio
        avatar
        website
        twitter
        github
        linkedin
      }
      posts {
        id
        title
        slug
        excerpt
        featuredImage
        createdAt
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      username
      profile {
        id
        bio
        avatar
        website
        twitter
        github
        linkedin
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
      email
      role
    }
  }
`;

export const USERS_QUERY = gql`
  query Users($role: UserRole, $search: String, $limit: Int, $offset: Int) {
    users(role: $role, search: $search, limit: $limit, offset: $offset) {
      data {
        id
        username
        email
        role
        createdAt
        lastLoginAt
        profile {
          displayName
          avatar
          bio
          website
          location
        }
        postsCount
        commentsCount
      }
      count
      totalCount
    }
  }
`;

export const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($id: ID!, $role: UserRole!) {
    updateUserRole(id: $id, role: $role) {
      id
      role
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
