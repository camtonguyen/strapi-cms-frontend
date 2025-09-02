import { Link, useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import type { GlobalData, GlobalQueryRef } from '~/types/global';
import type { SharedLink } from '~/types/shared';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import { Image } from '~/components/';

// Type for the parent layout loader data
type LayoutData = {
  globalQueryRef: GlobalQueryRef;
};

const Footer = () => {
  // Get the query reference from the parent layout's loader
  const { globalQueryRef } = useLoaderData<LayoutData>();
  // Use the query reference to get the data
  const { data } = useReadQuery(globalQueryRef);
  const globalData = (data as GlobalData).global;
  const { footer } = globalData;

  return (
    <footer className='border-t border-gray-800 py-12 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <Link
            to={footer.logo.href || '/'}
            className='text-xl font-bold tracking-tighter flex items-center justify-center'
          >
            <Image
              width={100}
              height={40}
              image={footer.logo.image}
              fallbackImage='/blog_logo.png'
            />
          </Link>
          {footer.shortIntro && (
            <p className='text-gray-400 text-sm mt-4 mb-6'>
              {footer.shortIntro}
            </p>
          )}
          {footer.socialItems && footer.socialItems.length > 0 && (
            <div className='flex justify-center space-x-4'>
              {footer.socialItems?.map((item: SharedLink) => {
                const Icon =
                  item.label === 'Twitter'
                    ? Twitter
                    : item.label === 'Facebook'
                    ? Facebook
                    : Linkedin;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className='text-gray-400 hover:text-white'
                  >
                    <Icon className='h-5 w-5' />
                  </Link>
                );
              })}
            </div>
          )}
          {footer.copyright && (
            <div className='border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400'>
              <p>{footer.copyright}</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
