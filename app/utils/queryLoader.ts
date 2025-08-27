import { apolloLoader } from '~/apollo';
import type { LoaderFunctionArgs } from 'react-router';
import type { DocumentNode } from '@apollo/client';

/**
 * @param query - The GraphQL query document
 * @param queryKey - A unique key to identify this query in the loader return object
 * @returns A loader function that preloads the query
 */
export const createQueryLoader = <TQueryKey extends string>(
  query: DocumentNode,
  queryKey: TQueryKey
) => {
  return apolloLoader<LoaderFunctionArgs>()(({ preloadQuery }) => {
    const queryRef = preloadQuery(query);
    return {
      [queryKey]: queryRef,
    } as Record<TQueryKey, typeof queryRef>;
  });
};

/**
 * @param queries - Array of query configurations
 * @returns A loader function that preloads all queries
 */
export const createMultiQueryLoader = <T extends Record<string, DocumentNode>>(
  queries: T
) => {
  return apolloLoader<LoaderFunctionArgs>()(({ preloadQuery }) => {
    const result: Record<string, any> = {};

    Object.entries(queries).forEach(([key, query]) => {
      result[key] = preloadQuery(query);
    });

    return result;
  });
};
