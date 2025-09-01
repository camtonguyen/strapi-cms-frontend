import type { QueryRef } from '@apollo/client/react';
import type { Markdown } from './blocks';

// Union type for all block components
export type PageBlock = Markdown;

export interface Page {
  documentId: string;
  title: string;
  slug: string;
  blocks?: PageBlock[];
  __typename?: string;
}

export interface PageData {
  pages: Page[];
}

export type PageQueryRef = QueryRef<PageData>;
