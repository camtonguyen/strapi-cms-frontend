import { Eye } from 'lucide-react';
import { Link } from 'react-router';
import type { FeatureArticles as FeatureArticlesType } from '~/types/blocks';
import FeaturedCard from './FeatureCard';

interface FeatureArticlesProps extends FeatureArticlesType {
  hasViewAll?: boolean;
}

export function FeatureArticles({
  title,
  articles,
  hasViewAll = true,
}: FeatureArticlesProps) {
  return (
    <section className='mb-20'>
      <div className='flex items-center justify-between mb-8'>
        {title && <h2 className='text-2xl font-bold'>{title}</h2>}
        {hasViewAll && (
          <Link
            to='/articles/'
            className='text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2'
          >
            View all <Eye className='h-4 w-4' />
          </Link>
        )}
      </div>
      {articles && articles.length > 0 && (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <FeaturedCard
              key={article.documentId}
              title={article.title || ''}
              description={article.description || ''}
              image={article.image}
              publishDate={article.publishDate}
              topic={article?.topics?.[0]}
              slug={article?.slug}
              id={article.documentId || article.id || ''}
            />
          ))}
        </div>
      )}
    </section>
  );
}
