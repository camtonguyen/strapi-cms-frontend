import type { Route } from './+types/index';
import { useReadQuery } from '@apollo/client/react';
import type { LandingData, LandingQueryRef } from '~/types/landing';
import { useLoaderData } from 'react-router';
import { createQueryLoaderWithSeo, createMetaFromMatches } from '~/utils/seo';
import { LANDING_QUERY, LANDING_SEO_QUERY } from '~/queries/pages/landing';
import { HeroBanner, FeatureArticles, Newsletter } from '~/components/';

export const loader = createQueryLoaderWithSeo(
  LANDING_QUERY,
  'landingQueryRef',
  undefined,
  LANDING_SEO_QUERY,
  undefined,
  (
    data:
      | {
          landingPage?: {
            title?: string | null;
            description?: string | null;
          } | null;
        }
      | undefined
  ) => {
    if (!data?.landingPage) return { title: null, description: null };
    return {
      title: data.landingPage.title ?? null,
      description: data.landingPage.description ?? null,
    };
  }
);

export const meta = createMetaFromMatches('routes/home/index', {
  siteName: 'AI Blog',
  defaultDescription: 'Basic Blog App using React & Strapi CMS',
});

// Load the landing query in the index route
// export const loader = createQueryLoader(LANDING_QUERY, 'landingQueryRef');

type QueryData = {
  landingQueryRef: LandingQueryRef;
};

export default function Home() {
  // Get the query references from the current route's loader
  const { landingQueryRef } = useLoaderData<QueryData>();

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
