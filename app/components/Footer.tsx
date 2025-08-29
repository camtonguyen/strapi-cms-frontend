import { Link, useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import { globalLoader } from '~/queries/global/global';
import type { GlobalData, SharedLink, GlobalQueryRef } from '~/types/global';
import { getStrapiUrl } from '~/utils/strapiUrl';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  // Get the query reference from the loader
  const { globalQueryRef } = useLoaderData<typeof globalLoader>();
  // Use the query reference to get the data
  const { data } = useReadQuery(globalQueryRef as GlobalQueryRef);
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
            {footer.logo.image?.url ? (
              <img
                width={100}
                height={40}
                src={getStrapiUrl(footer.logo.image.url)}
                alt={footer.logo.image.alternativeText || footer.logo.label}
              />
            ) : (
              footer.logo.label
            )}
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
