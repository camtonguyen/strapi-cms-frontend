import { Link, NavLink, useLoaderData } from 'react-router';
import { useReadQuery } from '@apollo/client/react';
import type { GlobalData, GlobalQueryRef } from '~/types/global';
import type { SharedLink } from '~/types/shared';
import { Button, Image } from '~/components/';

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
        <Link to={header.logo.href || '/'} className='max-md:max-w-[80px]'>
          <Image
            width={100}
            height={40}
            image={header.logo.image}
            fallbackImage='/blog_logo.png'
          />
        </Link>

        {/* Navigation Items */}
        <nav role='navigation' className='flex items-center space-x-6 text-sm'>
          {header.navItems?.map((item: SharedLink) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'text-white transition-all relative after:absolute after:content-[""] after:w-full after:h-0.5 after:bg-purple-500 after:block after:-bottom-[5px]'
                  : 'text-gray-400 hover:text-white transition-colors'
              }
              aria-label={item.label}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        {header.cta && (
          <Button className='bg-purple-600 max-md:hidden hover:bg-purple-700 whitespace-nowrap cursor-pointer'>
            {header.cta.label}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
