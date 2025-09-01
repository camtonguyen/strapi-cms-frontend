import type { QueryRef } from '@apollo/client/react';

import type { SharedLink, SharedLogo, SharedGeneralFields } from './shared';

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
  global: SharedGeneralFields & {
    header: HeaderData;
    footer: FooterData;
  };
}

// Type for the query reference
export type GlobalQueryRef = QueryRef<GlobalData>;
