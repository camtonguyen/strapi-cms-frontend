import { Link } from 'react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '~/components/ui/card';
import { CATEGORY_ICONS } from './atoms';
import type { TopicTagType } from '~/types/collections';

interface TopicCardProps {
  title: string;
  description: string;
  icon: TopicTagType;
  count: number;
  slug: string;
}

function TopicCard({
  title,
  description,
  icon,
  count,
  slug = '',
}: TopicCardProps) {
  return (
    <Link to={`/articles/${slug}`} className='group'>
      <Card className='bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-colors h-full'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='bg-purple-500/10 p-3 rounded-lg text-purple-500'>
              {icon && CATEGORY_ICONS[icon]}
            </div>
            {count && (
              <div className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm'>
                {count} article{count > 1 ? 's' : ''}
              </div>
            )}
          </div>
          <CardTitle className='text-xl mt-4 group-hover:text-purple-400 transition-colors text-white'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-gray-400'>
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <span className='text-purple-500 text-sm group-hover:text-purple-400 transition-colors'>
            View articles →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default TopicCard;
