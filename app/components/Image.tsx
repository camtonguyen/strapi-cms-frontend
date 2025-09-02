import type { ImageType } from '~/types/shared';
interface ImageProps {
  image?: ImageType;
  className?: string;
  width?: number;
  height?: number;
  fallbackImage?: string;
  props?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export function Image({
  image,
  className,
  width,
  height,
  fallbackImage,
  props,
}: ImageProps) {
  return (
    <img
      {...props}
      src={image?.url ? image.url : fallbackImage || '/placeholder.png'}
      alt={image?.alternativeText || ''}
      className={className}
      width={width}
      height={height}
    />
  );
}
