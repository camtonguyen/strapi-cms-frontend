import { Link } from 'react-router';
import { Clock } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CATEGORY_ICONS,
  Image,
} from '~/components/';
import type { TopicTag } from '~/types/collections';
import type { ImageType } from '~/types/shared';
interface FeaturedCardProps {
  title: string;
  image: ImageType | undefined;
  description: string;
  publishDate: string;
  topic: TopicTag | undefined;
  slug?: string;
  id: string | null;
}
function FeaturedCard({
  image,
  title,
  description,
  publishDate,
  topic,
  slug = '',
  id,
}: FeaturedCardProps) {
  return (
    <Card className='bg-gray-900 flex flex-col justify-between pt-0 border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors'>
      <div className='relative h-48 overflow-hidden'>
        <Image
          width={300}
          height={200}
          image={image}
          className='object-cover w-full h-full'
        />
      </div>

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
            to={`/article/${slug}`}
            className='text-purple-500 hover:text-purple-400'
            state={{ id }}
          >
            Read more →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default FeaturedCard;
