import { gql } from '@apollo/client';

export const FEATURE_TOPICS_FRAGMENT = gql`
  fragment FeatureTopicsFields on ComponentBlocksFeatureTopics {
    id
    title
    topics {
      documentId
      name
      type
      slug
      description
      articles {
        title
      }
    }
  }
`;
