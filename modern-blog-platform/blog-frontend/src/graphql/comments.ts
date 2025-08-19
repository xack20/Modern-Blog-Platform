import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    content
    status
    authorId
    author {
      id
      username
      email
      profile {
        avatar
      }
    }
    post {
      id
      title
      slug
    }
    createdAt
    updatedAt
    parentId
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      ...CommentFragment
      parentId
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const COMMENTS_QUERY = gql`
  query Comments(
    $status: CommentStatus
    $postId: ID
    $search: String
    $limit: Int
    $offset: Int
  ) {
    comments(
      status: $status
      postId: $postId
      search: $search
      limit: $limit
      offset: $offset
    ) {
      data {
        ...CommentFragment
        replies {
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
      }
      count
      totalCount
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const APPROVE_COMMENT_MUTATION = gql`
  mutation ApproveComment($id: ID!, $status: CommentStatus!) {
    updateCommentStatus(id: $id, status: $status) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: ID!) {
    removeComment(id: $id) {
      id
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($postId: ID!) {
    publicComments(postId: $postId) {
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
      parentId
      replies {
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
    }
  }
`;

export const GET_MY_COMMENTS = gql`
  query GetMyComments {
    userComments {
      id
      content
      status
      post {
        id
        title
        slug
      }
      createdAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
    updateComment(updateCommentInput: $updateCommentInput) {
      id
      content
      status
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    removeComment(id: $id) {
      id
    }
  }
`;

export const APPROVE_COMMENT = gql`
  mutation ApproveComment($id: ID!) {
    approveComment(id: $id) {
      id
      status
    }
  }
`;

export const REJECT_COMMENT = gql`
  mutation RejectComment($id: ID!) {
    rejectComment(id: $id) {
      id
      status
    }
  }
`;
