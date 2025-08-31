import { gql } from '@apollo/client';
import { createQueryLoader } from '~/utils/queryLoader';

export const LANDING_QUERY = gql`
  query GetLandingPage {
    landingPage {
      title
      description
      publishedAt
      updatedAt
      blocks {
        ... on ComponentBlocksHeroBanner {
          id
          heading
          content
          buttons {
            id
            label
            href
            isExternal
            type
          }
          image {
            url
            alternativeText
          }
        }
        ... on ComponentBlocksFeatureArticles {
          id
          title
          articles {
            documentId
            title
            description
            publishDate
            image {
              alternativeText
              url
            }
            topics {
              name
              type
            }
          }
        }
        ... on ComponentBlocksNewsletter {
          id
          title
          description
          email {
            label
            placeholder
            type
          }
          submit {
            label
            type
            href
            isExternal
          }
        }
      }
    }
  }
`;

// Use the generic loader
export const landingLoader = createQueryLoader(
  LANDING_QUERY,
  'landingQueryRef'
);
