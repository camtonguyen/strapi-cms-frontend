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
  documentId: string;
  slug: string;
  content?: BlocksContent;
  publishDate: string;
  image?: ImageType;
  topics?: TopicTag[];
}
