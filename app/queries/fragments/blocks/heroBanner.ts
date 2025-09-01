import { gql } from '@apollo/client';

export const HERO_BANNER_FRAGMENT = gql`
  fragment HeroBannerFields on ComponentBlocksHeroBanner {
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
`;
