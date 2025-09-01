export enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  OUTLINE = 'OUTLINE',
}

export interface ImageType {
  url: string;
  alternativeText?: string;
  caption?: string;
}

export interface SharedInput {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export interface SharedLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  type?: ButtonType;
}

export interface SharedLogo {
  href: string;
  label: string;
  image?: ImageType;
}

export interface SharedGeneralFields {
  id?: string;
  documentId?: string;
  title: string;
  description: string;
}
