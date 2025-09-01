import { useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import type { PageQueryRef } from '~/types/page';
import type { Page } from '~/types/page';
import { createQueryLoader } from '~/utils/queryLoader';
import { PAGE_QUERY } from '~/queries/pages/page';

export const loader = createQueryLoader(
  PAGE_QUERY,
  'pageQueryRef',
  ({ params }) => ({ slug: params.slug || '' })
);

// Type for the loader data
type LoaderData = {
  // globalQueryRef: GlobalQueryRef;
  pageQueryRef: PageQueryRef;
};

const DynamicPage = () => {
  const { pageQueryRef } = useLoaderData<LoaderData>();
  const { data } = useReadQuery(pageQueryRef);
  const pageData = data?.pages?.[0] as Page;

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>Slug: {pageData.slug}</p>
    </div>
  );
};

export default DynamicPage;
