import { gql } from '@apollo/client';

export const MARKDOWN_FRAGMENT = gql`
  fragment MarkdownFields on ComponentBlocksMarkdown {
    id
    content
  }
`;
