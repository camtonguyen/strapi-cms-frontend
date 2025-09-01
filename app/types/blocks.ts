import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type {
  ImageType,
  SharedGeneralFields,
  SharedInput,
  SharedLink,
} from './shared';
import type { Article } from './collections';

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
export interface Newsletter extends SharedGeneralFields {
  email?: SharedInput;
  submit: SharedLink;
}

export interface Markdown {
  id?: string;
  content?: string;
}
