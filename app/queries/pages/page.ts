import { gql } from '@apollo/client';
import { FEATURE_ARTICLES_FRAGMENT } from '../fragments/blocks/featureArticles';
import { PLAIN_CONTENT_FRAGMENT } from '../fragments/blocks/plainContent';
import { FEATURE_TOPICS_FRAGMENT } from '../fragments/blocks/featureTopics';

export const PAGE_QUERY = gql`
  ${PLAIN_CONTENT_FRAGMENT}
  ${FEATURE_ARTICLES_FRAGMENT}
  ${FEATURE_TOPICS_FRAGMENT}
  query GetPage($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      blocks {
        __typename
        ...PlainContentFields
        ...FeatureArticlesFields
        ...FeatureTopicsFields
      }
    }
  }
`;

export const PAGE_SEO_QUERY = gql`
  query GetPageSEO($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      title
      description
    }
  }
`;
