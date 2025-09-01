import type { FeatureTopics as FeatureTopicsType } from '~/types/blocks';
import TopicCard from './TopicCard';
import { TopicTagType } from '~/types/collections';

interface FeatureTopicsProps extends FeatureTopicsType {}

export function FeatureTopics({ title, topics }: FeatureTopicsProps) {
  return (
    <section className='mb-12'>
      {title && <h1 className='text-4xl font-bold mb-8'>{title}</h1>}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {topics?.map((topic, index) => (
          <TopicCard
            key={index}
            title={topic.name}
            description={topic.description}
            icon={topic.type || TopicTagType.GENERAL}
            count={topic.articles?.length || 0}
            slug={topic.slug}
          />
        ))}
      </div>
    </section>
  );
}
