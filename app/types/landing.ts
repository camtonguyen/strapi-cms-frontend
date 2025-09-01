import type { QueryRef } from '@apollo/client/react';
import type { HeroBanner, FeatureArticles, Newsletter } from './blocks';
import type { SharedGeneralFields } from './shared';

// Union type for all block components
export type LandingBlock = HeroBanner | FeatureArticles | Newsletter;

// Main landing page structure
export interface LandingPage extends SharedGeneralFields {
  id: string;
  title: string;
  description: string;
  blocks?: LandingBlock[];
  publishedAt: string;
  updatedAt: string;
}

// Type for the query data
export interface LandingData {
  landingPage: LandingPage;
}

// Type for the query reference
export type LandingQueryRef = QueryRef<LandingData>;
