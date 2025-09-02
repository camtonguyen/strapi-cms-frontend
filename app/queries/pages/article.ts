import { gql } from '@apollo/client';

export const ARTICLE_QUERY = gql`
  query getArticleByID($documentId: ID!) {
    article(documentId: $documentId) {
      title
      content
      image {
        url
        alternativeText
      }
      author
      publishDate
      timeRead
      related {
        articles {
          title
          description
          image {
            url
            alternativeText
          }
        }
      }
      topics {
        name
        type
      }
    }
  }
`;

export const ARTICLE_SEO_QUERY = gql`
  query GetArticleSEO($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      title
      description
    }
  }
`;
