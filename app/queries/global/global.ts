import { gql } from '@apollo/client';

export const GLOBAL_QUERY = gql`
  query GetGlobal {
    global {
      title
      description
      header {
        logo {
          href
          label
          image {
            url
            alternativeText
          }
        }
        navItems {
          id
          label
          href
          isExternal
        }
        cta {
          id
          label
          href
          isExternal
        }
      }
      footer {
        logo {
          href
          label
          image {
            url
            alternativeText
          }
        }
        copyright
        shortIntro
        socialItems {
          id
          label
          href
          isExternal
        }
      }
    }
  }
`;
