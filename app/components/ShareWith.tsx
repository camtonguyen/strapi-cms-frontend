import { useToastHelpers } from './ToastProvider';
import { Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';
import { Button } from '~/components/';

interface ShareWithProps {
  title?: string;
}
const ShareWith = ({ title }: ShareWithProps) => {
  const { success } = useToastHelpers();
  const sharePlatforms = [
    { label: 'Twitter', icon: Twitter, value: 'twitter' },
    { label: 'Facebook', icon: Facebook, value: 'facebook' },
    { label: 'LinkedIn', icon: Linkedin, value: 'linkedin' },
    { label: 'Clipboard', icon: Share2, value: 'clipboard' },
  ];
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
        success('Copied to clipboard');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  return (
    <div className='flex justify-between items-center mb-8'>
      <div className='flex gap-2'>
        {sharePlatforms
          .filter(({ value }) => value !== 'clipboard')
          .map((platform) => (
            <Button
              key={platform.value}
              onClick={() => handleShare(platform.value)}
              className='bg-transparent cursor-pointer group h-8 px-3 border-gray-800 hover:bg-gray-900'
            >
              <platform.icon className='h-4 w-4 mr-1 group-hover:text-white' />
              <span className='group-hover:text-white'>{platform.label}</span>
            </Button>
          ))}
      </div>
      {sharePlatforms.find(({ value }) => value === 'clipboard') && (
        <Button
          onClick={() => handleShare('clipboard')}
          className='bg-transparent cursor-pointer group h-8 px-3 border-gray-800 hover:bg-gray-900'
        >
          <Share2 className='h-4 w-4 mr-1 group-hover:text-white' />
          <span className='group-hover:text-white'>Share</span>
        </Button>
      )}
    </div>
  );
};

export default ShareWith;
