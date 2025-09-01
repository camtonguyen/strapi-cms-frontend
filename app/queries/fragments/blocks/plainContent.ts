import { gql } from '@apollo/client';

export const PLAIN_CONTENT_FRAGMENT = gql`
  fragment PlainContentFields on ComponentBlocksPlainContent {
    id
    content
  }
`;
