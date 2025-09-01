import { gql } from '@apollo/client';
import { createQueryLoader } from '~/utils/queryLoader';
import { MARKDOWN_FRAGMENT } from '../fragments/blocks/markdown';

export const PAGE_QUERY = gql`
  ${MARKDOWN_FRAGMENT}

  query GetPage($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      blocks {
        __typename
        ...MarkdownFields
      }
    }
  }
`;
