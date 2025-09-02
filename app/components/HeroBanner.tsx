import { Link } from 'react-router';
import type { HeroBanner as HeroBannerType } from '~/types/blocks';
import { ButtonType } from '~/types/shared';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Button, Image } from '~/components/';
import { Fragment } from 'react';

interface HeroBannerProps extends HeroBannerType {}
export function HeroBanner({
  heading,
  content,
  buttons,
  image,
}: HeroBannerProps) {
  return (
    <section className='mb-20'>
      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <div className='space-y-6'>
          {heading && (
            <div className='hero-heading'>
              <BlocksRenderer content={heading} />
            </div>
          )}
          {content && (
            <div className='hero-content'>
              <BlocksRenderer content={content} />
            </div>
          )}
          <div className='flex flex-col sm:flex-row gap-4'>
            {buttons?.map((button, index) => {
              const buttonClass =
                button.type === ButtonType.PRIMARY
                  ? 'rounded-md text-center px-4 py-1.5 bg-purple-600 hover:bg-purple-700 cursor-pointer'
                  : 'border-1 border-gray-700 hover:border-gray-500 cursor-pointer';
              return (
                <Fragment key={`${button.id}-${button.label}-${index}`}>
                  {button.href ? (
                    <Link
                      className={buttonClass}
                      to={button.href}
                      aria-label={button.label}
                    >
                      {button.label}
                    </Link>
                  ) : (
                    <Button className={buttonClass}>{button.label}</Button>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className='relative h-[400px] rounded-xl overflow-hidden border border-gray-800'>
          <Image
            width={500}
            height={400}
            image={image}
            className='object-cover w-full h-full'
            props={{ fetchPriority: 'high' }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
        </div>
      </div>
    </section>
  );
}
