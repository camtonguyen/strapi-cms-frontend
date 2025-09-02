import { useLocation, useParams } from 'react-router';
import { TOPIC_QUERY, TOPIC_SEO_QUERY } from '~/queries/pages/topic';
import type { Topic } from '~/types/collections';
import { useQuery } from '@apollo/client/react';
import { FeatureArticles, Loading } from '~/components/';
import { createMetaFromMatches, createSeoLoader } from '~/utils/seo';

export const loader = createSeoLoader(
  TOPIC_SEO_QUERY,
  ({ request }) => {
    const url = new URL(request.url);
    const slug = url.pathname.split('/')[2] || '';
    return { slug };
  },
  { collectionKey: 'topics', titleKey: 'name' }
);

export const meta = createMetaFromMatches('routes/topic/index');

const Topic = () => {
  const location = useLocation();
  const params = useParams();
  const state = location.state as Topic;

  const { data: stateData } = useQuery<{ topic: Topic }>(TOPIC_QUERY, {
    variables: { documentId: state?.id?.toString() || '' },
    skip: !state?.id && !params.slug, // Skip if no ID available
  });

  const { topic } = stateData || {};
  if (!stateData) {
    return <Loading />;
  }
  return (
    <>
      {topic && (
        <FeatureArticles
          title={topic.name}
          articles={topic.articles}
          id={topic.documentId || ''}
          hasViewAll={false}
        />
      )}
    </>
  );
};

export default Topic;
