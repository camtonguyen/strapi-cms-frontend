import { gql } from '@apollo/client';
import { createQueryLoader } from '~/utils/queryLoader';

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
    }
  }
`;

// Use the generic loader
export const globalLoader = createQueryLoader(GLOBAL_QUERY, 'globalQueryRef');
