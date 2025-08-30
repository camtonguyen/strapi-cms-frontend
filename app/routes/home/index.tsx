import type { Route } from './+types/index';
import { useReadQuery } from '@apollo/client/react';
import type { LandingData, LandingQueryRef } from '~/types/landing';
import type { GlobalQueryRef } from '~/types/global';
import { useLoaderData } from 'react-router';
import { createMultiQueryLoader } from '~/utils/queryLoader';
import { GLOBAL_QUERY } from '~/queries/global/global';
import { LANDING_QUERY } from '~/queries/pages/landing';

import { HeroBanner } from '~/components/HeroBanner';
import { FeatureArticles } from '~/components/FeatureArticles';
import { Newsletter } from '~/components/Newsletter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AI Blog | Home' },
    { name: 'description', content: 'Basic Blog App using React & Strapi CMS' },
  ];
}

// Load both queries in the index route
export const loader = createMultiQueryLoader({
  globalQueryRef: GLOBAL_QUERY,
  landingQueryRef: LANDING_QUERY,
});

// Type for the multi-query loader data
type MultiQueryData = {
  globalQueryRef: GlobalQueryRef;
  landingQueryRef: LandingQueryRef;
};

export default function Home() {
  // Get the query references from the current route's loader
  const { landingQueryRef } = useLoaderData<MultiQueryData>();

  // Use the query reference to get the data
  const { data } = useReadQuery(landingQueryRef);
  const landingData = (data as LandingData).landingPage;

  return (
    <>
      {/* Render each block dynamically */}
      {landingData.blocks?.map((block, index) => {
        // Type guard to determine which component to render
        if ('heading' in block && 'content' in block) {
          return <HeroBanner key={`${block.id}-hero-banner`} {...block} />;
        }

        if ('articles' in block) {
          return (
            <FeatureArticles key={`${block.id}-feature-articles`} {...block} />
          );
        }

        if ('email' in block && 'submit' in block) {
          return <Newsletter key={`${block.id}-newsletter`} {...block} />;
        }

        return null;
      })}
    </>
  );
}
