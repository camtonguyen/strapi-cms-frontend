import { useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import type { PageQueryRef } from '~/types/page';
import type { Page, PageBlock } from '~/types/page';
import { createQueryLoader } from '~/utils/queryLoader';
import { PAGE_QUERY } from '~/queries/pages/page';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FeatureArticles } from '~/components/FeatureArticles';
import { FeatureTopics } from '~/components/FeatureTopics';
import { NotFound } from '~/components/NotFound';

export const loader = createQueryLoader(
  PAGE_QUERY,
  'pageQueryRef',
  ({ params }) => ({ slug: params.slug || '' })
);

// Type for the loader data
type LoaderData = {
  pageQueryRef: PageQueryRef;
};

const DynamicPage = () => {
  const { pageQueryRef } = useLoaderData<LoaderData>();
  const { data } = useReadQuery(pageQueryRef);
  const pageData = data?.pages?.[0] as Page;

  if (!pageData) {
    return <NotFound />;
  }

  return (
    <>
      {pageData?.blocks &&
        pageData?.blocks?.length > 0 &&
        pageData?.blocks?.map((block: PageBlock) => {
          if (block.__typename === 'ComponentBlocksPlainContent') {
            return (
              <section
                className='html-content'
                key={`${block.__typename}-${block.id}`}
              >
                <BlocksRenderer content={block.content || []} />
              </section>
            );
          }
          if (block.__typename === 'ComponentBlocksFeatureArticles') {
            return (
              <FeatureArticles
                key={`${block.__typename}-${block.id}`}
                id={`${block.__typename}-${block.id}`}
                title={block.title}
                articles={block.articles}
                hasViewAll={false}
              />
            );
          }
          if (block.__typename === 'ComponentBlocksFeatureTopics') {
            return (
              <FeatureTopics
                key={block.id}
                id={`${block.__typename}-${block.id}`}
                title={block.title}
                topics={block.topics}
              />
            );
          }
        })}
    </>
  );
};

export default DynamicPage;
