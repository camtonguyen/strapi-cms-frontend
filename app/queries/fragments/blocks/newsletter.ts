import { gql } from '@apollo/client';

export const NEWSLETTER_FRAGMENT = gql`
  fragment NewsletterFields on ComponentBlocksNewsletter {
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
`;
