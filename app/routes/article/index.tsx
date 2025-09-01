import { Link, useLocation, useParams } from 'react-router';
import { useQuery } from '@apollo/client/react';
import type { Article } from '~/types/collections';
import { ARTICLE_QUERY } from '~/queries/pages/article';
import {
  ArrowLeft,
  Clock,
  Twitter,
  Facebook,
  Linkedin,
  Share2,
} from 'lucide-react';
import { CATEGORY_ICONS } from '~/components/atoms';
import { getStrapiUrl } from '~/utils/strapiUrl';
import { Button } from '~/components/ui/button';
import { BlocksRenderer } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';

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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${title}`;

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

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
      {image && (
        <div className='relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8'>
          <img
            src={getStrapiUrl(image.url)}
            alt={image.alternativeText || 'Article Image'}
            className='object-cover w-full h-full'
          />
        </div>
      )}
      <div className='flex justify-between items-center mb-8'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='bg-transparent cursor-pointer group h-8 px-3 border-gray-800 hover:bg-gray-900'
            onClick={() => handleShare('twitter')}
          >
            <Twitter className='h-4 w-4 mr-1 group-hover:text-white' />
            <span className='group-hover:text-white'>Share</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='bg-transparent cursor-pointer group px-3 border-gray-800 hover:bg-gray-900'
            onClick={() => handleShare('facebook')}
          >
            <Facebook className='h-4 w-4 mr-1 group-hover:text-white' />
            <span className='group-hover:text-white'>Share</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='bg-transparent cursor-pointer group h-8 px-3 border-gray-800 hover:bg-gray-900'
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className='h-4 w-4 mr-1 group-hover:text-white' />
            <span className='group-hover:text-white'>Share</span>
          </Button>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='bg-transparent cursor-pointer group h-8 px-3 border-gray-800 hover:bg-gray-900'
          onClick={() => handleShare('clipboard')}
        >
          <Share2 className='h-4 w-4 mr-1 group-hover:text-white' />
          <span className='group-hover:text-white'>Share</span>
        </Button>
      </div>
      <BlocksRenderer content={content || []} />
    </section>
  );
};

export default Article;
