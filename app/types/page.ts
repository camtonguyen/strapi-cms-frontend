import type { QueryRef } from '@apollo/client/react';
import type { PlainContent, FeatureArticles, FeatureTopics } from './blocks';
import { ComponentBlocks } from '~/utils/constants';

// Union type for all block components
export type PageBlock =
  | (PlainContent & { __typename: typeof ComponentBlocks.PLAIN_CONTENT })
  | (FeatureArticles & { __typename: typeof ComponentBlocks.FEATURE_ARTICLES })
  | (FeatureTopics & { __typename: typeof ComponentBlocks.FEATURE_TOPICS });

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
