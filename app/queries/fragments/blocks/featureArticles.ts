import { gql } from '@apollo/client';

export const FEATURE_ARTICLES_FRAGMENT = gql`
  fragment FeatureArticlesFields on ComponentBlocksFeatureArticles {
    id
    title
    articles {
      documentId
      title
      description
      publishDate
      slug
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
`;
