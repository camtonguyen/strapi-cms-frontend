import { Link } from 'react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CATEGORY_ICONS,
} from '~/components/';
import type { TopicTagType, Topic } from '~/types/collections';

interface TopicCardProps extends Topic {
  icon: TopicTagType;
  count: number;
}

function TopicCard({
  name,
  description,
  icon,
  count,
  documentId,
  slug,
}: TopicCardProps) {
  return (
    <Link state={{ id: documentId }} to={`/articles/${slug}`} className='group'>
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
            {name}
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
