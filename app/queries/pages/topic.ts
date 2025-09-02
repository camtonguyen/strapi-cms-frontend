import { gql } from '@apollo/client';

export const TOPIC_QUERY = gql`
  query getTopicByID($documentId: ID!) {
    topic(documentId: $documentId) {
      name
      description
      articles {
        documentId
        title
        description
        slug
        image {
          url
          alternativeText
        }
        publishDate
        topics {
          name
          type
        }
      }
    }
  }
`;

export const TOPIC_SEO_QUERY = gql`
  query GetTopicSEO($slug: String!) {
    topics(filters: { slug: { eq: $slug } }) {
      name
      description
    }
  }
`;
