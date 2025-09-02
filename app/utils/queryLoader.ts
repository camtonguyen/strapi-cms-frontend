import { apolloLoader } from '~/apollo';
import type { LoaderFunctionArgs } from 'react-router';
import type { DocumentNode, OperationVariables } from '@apollo/client';

/**
 * @param query - The GraphQL query document
 * @param queryKey - A unique key to identify this query in the loader return object
 * @param variables - Optional function to generate variables from loader args
 * @returns A loader function that preloads the query
 */
export const createQueryLoader = <
  TQueryKey extends string,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  queryKey: TQueryKey,
  variables?: (args: LoaderFunctionArgs) => TVariables
) => {
  return apolloLoader<LoaderFunctionArgs>()(({ preloadQuery, ...args }) => {
    const queryRef = preloadQuery(
      query,
      variables ? { variables: variables(args) } : undefined
    );
    return {
      [queryKey]: queryRef,
    } as Record<TQueryKey, typeof queryRef>;
  });
};
