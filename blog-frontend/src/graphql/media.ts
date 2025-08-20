import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(uploadFileInput: { file: $file }) {
      id
      url
      filename
      type
      size
      createdAt
    }
  }
`;

export const GET_MY_MEDIA = gql`
  query GetMyMedia {
    myMedia {
      id
      url
      filename
      type
      size
      createdAt
    }
  }
`;

export const DELETE_MEDIA = gql`
  mutation DeleteMedia($id: ID!) {
    removeMedia(id: $id) {
      id
      url
      filename
    }
  }
`;

export const GENERATE_PRESIGNED_URL = gql`
  mutation GeneratePresignedUrl($key: String!) {
    generatePresignedUrl(key: $key)
  }
`;
