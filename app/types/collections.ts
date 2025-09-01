import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { ImageType, SharedGeneralFields } from './shared';

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

export interface Article extends SharedGeneralFields {
  slug: string;
  content?: BlocksContent;
  author?: string;
  timeRead?: number;
  publishDate: string;
  image?: ImageType;
  topics?: TopicTag[];
}

export interface Topic extends SharedGeneralFields, TopicTag {
  slug: string;
  articles?: Article[];
}
