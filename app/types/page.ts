import type { QueryRef } from '@apollo/client/react';
import type { PlainContent, FeatureArticles, FeatureTopics } from './blocks';

// Union type for all block components
export type PageBlock =
  | (PlainContent & { __typename: 'ComponentBlocksPlainContent' })
  | (FeatureArticles & { __typename: 'ComponentBlocksFeatureArticles' })
  | (FeatureTopics & { __typename: 'ComponentBlocksFeatureTopics' });

export interface Page {
  documentId: string;
  title: string;
  slug: string;
  blocks?: PageBlock[];
  __typename?: string | undefined;
}

export interface PageData {
  pages: Page[];
}

export type PageQueryRef = QueryRef<PageData>;
