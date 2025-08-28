import { Link, NavLink, useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import { globalLoader } from '~/queries/global/global';
import type { GlobalData, SharedLink, GlobalQueryRef } from '~/types/global';
import { getStrapiUrl } from '~/utils/strapiUrl';

const Header = () => {
  // Get the query reference from the loader
  const { globalQueryRef } = useLoaderData<typeof globalLoader>();
  // Use the query reference to get the data
  const { data } = useReadQuery(globalQueryRef as GlobalQueryRef);
  const globalData = (data as GlobalData).global;
  const { header } = globalData;

  return (
    <header className='container mx-auto py-6'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <Link
          to={header.logo.href || '/'}
          className='text-xl font-bold tracking-tighter'
        >
          {header.logo.image?.url ? (
            <img
              width={100}
              height={40}
              src={getStrapiUrl(header.logo.image.url)}
              alt={header.logo.image.alternativeText || header.logo.label}
            />
          ) : (
            header.logo.label
          )}
        </Link>

        {/* Navigation Items */}
        <nav className='hidden md:flex items-center space-x-6 text-sm'>
          {header.navItems?.map((item: SharedLink) => (
            <NavLink
              key={item.id}
              to={item.href}
              className='text-gray-400 hover:text-white transition-colors'
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        {header.cta && (
          <button className='border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white'>
            {header.cta.label}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
