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
