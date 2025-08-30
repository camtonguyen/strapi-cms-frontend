import type { QueryRef } from '@apollo/client/react';
import type { SharedLink } from './global';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

// Shared Input component (referenced in newsletter but not defined in global)
export interface SharedInput {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export interface ImageType {
  url: string;
  alternativeText?: string;
  caption?: string;
}

export enum TopicTagType {
  AI = 'AI',
  VISION = 'VISION',
  RESEARCH = 'RESEARCH',
  GENERAL = 'GENERAL',
}

export interface TopicTag {
  name: string;
  type?: TopicTagType;
}

// Article type (referenced in feature articles)
export interface Article {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  content?: BlocksContent;
  publishDate: string;
  image?: ImageType;
  topics?: TopicTag[];
}

// Hero Banner component
export interface HeroBanner {
  id: string;
  heading: BlocksContent;
  content: BlocksContent;
  buttons?: SharedLink[];
  image?: ImageType;
}

// Feature Articles component
export interface FeatureArticles {
  id: string;
  title: string;
  articles?: Article[];
}

// Newsletter component
export interface Newsletter {
  id: string;
  title: string;
  description: string;
  email?: SharedInput;
  submit: SharedLink;
}

// Union type for all block components
export type LandingBlock = HeroBanner | FeatureArticles | Newsletter;

// Main landing page structure
export interface LandingPage {
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
