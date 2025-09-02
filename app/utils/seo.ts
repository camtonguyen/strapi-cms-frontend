import type { DocumentNode, OperationVariables } from '@apollo/client';
import type { LoaderFunctionArgs } from 'react-router';
import { apolloLoader, makeClient } from '~/apollo';

type SeoShape = { title?: string | null; description?: string | null };

type ExtractSeo<TData> = (
  data: TData | undefined
) => SeoShape | null | undefined;

export const createQueryLoaderWithSeo = <
  TQueryKey extends string,
  TPreloadVars extends OperationVariables = OperationVariables,
  TSeoVars extends OperationVariables = OperationVariables,
  TSeoData = unknown
>(
  query: DocumentNode,
  queryKey: TQueryKey,
  getPreloadVariables?: (args: LoaderFunctionArgs) => TPreloadVars,
  seoQuery?: DocumentNode,
  getSeoVariables?: (args: LoaderFunctionArgs) => TSeoVars,
  extractSeo?: ExtractSeo<TSeoData>
) => {
  return apolloLoader<LoaderFunctionArgs>()(
    async ({ preloadQuery, ...args }) => {
      const queryRef = preloadQuery(
        query,
        getPreloadVariables
          ? { variables: getPreloadVariables(args) }
          : undefined
      );

      let seo: SeoShape | undefined;
      if (seoQuery && extractSeo) {
        const client = makeClient(args.request);
        const { data } = await client.query<TSeoData>({
          query: seoQuery,
          variables: getSeoVariables ? getSeoVariables(args) : undefined,
        });
        seo = extractSeo(data) ?? { title: null, description: null };
      }

      return {
        [queryKey]: queryRef,
        ...(seo ? { seo } : {}),
      } as Record<TQueryKey, typeof queryRef> & { seo?: SeoShape };
    }
  );
};

export const createMetaFromMatches = (
  routeId: string,
  {
    siteName = 'AI Blog',
    defaultDescription = 'Basic Blog App using React & Strapi CMS',
  }: {
    siteName?: string;
    defaultDescription?: string;
  } = {}
) => {
  return ({
    matches,
  }: {
    matches: Array<{ id: string; loaderData?: unknown }>;
  }) => {
    const routeMatch = matches.find((m) => m?.id === routeId);
    const seo = (
      routeMatch?.loaderData as
        | { seo?: { title?: string | null; description?: string | null } }
        | undefined
    )?.seo;

    const title = `${siteName} | ${seo?.title || siteName}`;

    return [
      { title },
      {
        name: 'description',
        content: seo?.description || defaultDescription,
      },
    ];
  };
};

// SEO-only loader: supports either a custom extractor or collection config
type CollectionOptions = {
  collectionKey: string;
  titleKey?: string;
  descriptionKey?: string;
  index?: number;
};

export const createSeoLoader = <
  TVars extends OperationVariables = OperationVariables,
  TData = unknown
>(
  seoQuery: DocumentNode,
  getSeoVariables: (args: LoaderFunctionArgs) => TVars,
  extractSeoOrOptions: ExtractSeo<TData> | CollectionOptions
) => {
  return apolloLoader<LoaderFunctionArgs>()(async (args) => {
    const client = makeClient(args.request);
    const { data } = await client.query<TData>({
      query: seoQuery,
      variables: getSeoVariables(args),
    });

    let seo: SeoShape | null | undefined;

    if (typeof extractSeoOrOptions === 'function') {
      seo = extractSeoOrOptions(data);
    } else {
      const {
        collectionKey,
        titleKey = 'title',
        descriptionKey = 'description',
        index = 0,
      } = extractSeoOrOptions || {};
      const collection: unknown = (
        data as unknown as Record<string, unknown>
      )?.[collectionKey];
      const item =
        Array.isArray(collection) && collection.length > index
          ? (collection as Array<Record<string, unknown>>)[index]
          : undefined;
      seo = item
        ? {
            title: (item[titleKey] as string | null | undefined) ?? null,
            description:
              (item[descriptionKey] as string | null | undefined) ?? null,
          }
        : { title: null, description: null };
    }

    return { seo: seo ?? { title: null, description: null } };
  });
};
