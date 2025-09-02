import { Link, useLocation, useParams } from 'react-router';
import { useQuery } from '@apollo/client/react';
import type { Article } from '~/types/collections';
import { ARTICLE_QUERY, ARTICLE_SEO_QUERY } from '~/queries/pages/article';
import { ArrowLeft, Clock } from 'lucide-react';
import { CATEGORY_ICONS, ShareWith, Image, Loading } from '~/components/';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { createMetaFromMatches, createSeoLoader } from '~/utils/seo';

export const loader = createSeoLoader(
  ARTICLE_SEO_QUERY,
  ({ request }) => {
    const url = new URL(request.url);
    const slug = url.pathname.split('/')[2] || '';
    return { slug };
  },
  { collectionKey: 'articles' }
);

export const meta = createMetaFromMatches('routes/article/index');

const Article = () => {
  const location = useLocation();
  const params = useParams();
  const state = location.state as Article;

  const { data: stateData } = useQuery<{ article: Article }>(ARTICLE_QUERY, {
    variables: { documentId: state?.id?.toString() || '' },
    skip: !state?.id && !params.slug, // Skip if no ID available
  });

  const { title, content, image, author, publishDate, timeRead, topics } =
    stateData?.article || {};

  if (!stateData) {
    return <Loading />;
  }

  return (
    <section className='html-content'>
      <Link
        to='/articles/'
        className='back-link inline-flex items-center text-gray-400 hover:text-white mb-8'
      >
        <ArrowLeft className='h-4 w-4 mr-2' />
        Back to articles
      </Link>
      {topics && topics[0]?.type && (
        <div className='flex items-center gap-2 text-sm text-purple-500 mb-4'>
          {CATEGORY_ICONS[topics[0]?.type || CATEGORY_ICONS.GENERAL]}
          <span>{topics[0]?.name}</span>
        </div>
      )}
      {title && (
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6'>
          {title}
        </h1>
      )}

      <div className='flex items-center gap-4 text-sm text-gray-400 mb-8'>
        {timeRead && (
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>{timeRead}</span>
          </div>
        )}
        {publishDate && <div>{publishDate}</div>}
        {author && <div>By {author}</div>}
      </div>

      {title && (
        <>
          <div className='relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8'>
            <Image
              width={500}
              height={400}
              image={image}
              className='object-cover w-full h-full'
            />
          </div>
          <ShareWith title={title} />
        </>
      )}

      <BlocksRenderer content={content || []} />
    </section>
  );
};

export default Article;
