import { gql } from '@apollo/client';
import { FEATURE_ARTICLES_FRAGMENT } from '../fragments/blocks/featureArticles';
import { HERO_BANNER_FRAGMENT } from '../fragments/blocks/heroBanner';
import { NEWSLETTER_FRAGMENT } from '../fragments/blocks/newsletter';

export const LANDING_QUERY = gql`
  ${HERO_BANNER_FRAGMENT}
  ${FEATURE_ARTICLES_FRAGMENT}
  ${NEWSLETTER_FRAGMENT}

  query GetLandingPage {
    landingPage {
      title
      description
      publishedAt
      updatedAt
      blocks {
        __typename
        ...HeroBannerFields
        ...FeatureArticlesFields
        ...NewsletterFields
      }
    }
  }
`;
