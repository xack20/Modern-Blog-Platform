import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      user {
        id
        email
        username
        role
      }
      access_token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        username
        role
      }
      access_token
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      username
      role
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
