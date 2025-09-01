import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '~/components/ui/card';
import { Link } from 'react-router';
import { BrainCircuit, Clock, Eye } from 'lucide-react';
import type { TopicTag } from '~/types/collections';
import type { ImageType } from '~/types/shared';
import { getStrapiUrl } from '~/utils/strapiUrl';

const CATEGORY_ICONS = {
  AI: <BrainCircuit className='h-5 w-5' />,
  VISION: <Eye className='h-5 w-5' />,
  RESEARCH: <BrainCircuit className='h-5 w-5' />,
  GENERAL: <BrainCircuit className='h-5 w-5' />,
};

interface FeaturedCardProps {
  title: string;
  image: ImageType | undefined;
  description: string;
  publishDate: string;
  topic: TopicTag | undefined;
  slug?: string;
}
function FeaturedCard({
  image,
  title,
  description,
  publishDate,
  topic,
  slug = '',
}: FeaturedCardProps) {
  return (
    <Card className='bg-gray-900 flex flex-col justify-between pt-0 border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors'>
      {image && (
        <div className='relative h-48 overflow-hidden'>
          <img
            src={getStrapiUrl(image.url)}
            alt={image.alternativeText}
            className='object-cover'
          />
        </div>
      )}
      <CardHeader>
        {topic && (
          <div className='flex items-center gap-2 text-sm text-purple-500 mb-2'>
            {topic?.type && CATEGORY_ICONS[topic.type]}
            <span>{topic?.name}</span>
          </div>
        )}
        {title && (
          <CardTitle className='font-medium text-white leading-5'>
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {description && (
          <CardDescription className='text-gray-400'>
            {description}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className='flex justify-between text-sm text-gray-500'>
        {publishDate && (
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>{publishDate}</span>
          </div>
        )}
        {slug && (
          <Link
            to={`/articles/${slug}`}
            className='text-purple-500 hover:text-purple-400'
          >
            Read more →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default FeaturedCard;
