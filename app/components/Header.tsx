import { Link, NavLink, useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import type { GlobalData, SharedLink, GlobalQueryRef } from '~/types/global';
import { getStrapiUrl } from '~/utils/strapiUrl';
import { Button } from '~/components/ui/button';

// Type for the parent layout loader data
type LayoutData = {
  globalQueryRef: GlobalQueryRef;
};

const Header = () => {
  // Get the query reference from the parent layout's loader
  const { globalQueryRef } = useLoaderData<LayoutData>();
  // Use the query reference to get the data
  const { data } = useReadQuery(globalQueryRef);
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
          <Button className='bg-purple-600 hover:bg-purple-700 whitespace-nowrap cursor-pointer'>
            {header.cta.label}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
