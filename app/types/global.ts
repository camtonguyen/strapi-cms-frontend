import type { QueryRef } from '@apollo/client/react';

// Type definitions based on Strapi schema

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  OUTLINE = 'OUTLINE',
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
  image?: {
    url: string;
    alternativeText: string;
  };
}

export interface HeaderData {
  logo: SharedLogo;
  navItems?: SharedLink[];
  socialItems?: SharedLink[];
  cta?: SharedLink;
}

export interface FooterData {
  logo: SharedLogo;
  navItems?: SharedLink[];
  cta?: SharedLink;
  shortIntro?: string;
  copyright?: string;
  socialItems?: SharedLink[];
}

export interface GlobalData {
  global: {
    title: string;
    description: string;
    header: HeaderData;
    footer: FooterData;
  };
}

// Type for the query reference
export type GlobalQueryRef = QueryRef<GlobalData>;
