import { Link, NavLink } from 'react-router';

const Header = () => {
  return (
    <header className='container mx-auto py-6'>
      <div className='flex items-center justify-between'>
        <Link to='/' className='text-xl font-bold tracking-tighter'>
          <span className='text-purple-500'>AI</span> Blog
        </Link>
        <nav className='hidden md:flex items-center space-x-6 text-sm'>
          <NavLink
            to='/'
            className='text-gray-400 hover:text-white transition-colors'
          >
            Home
          </NavLink>
          <NavLink
            to='/articles/'
            className='text-gray-400 hover:text-white transition-colors'
          >
            Articles
          </NavLink>
          <NavLink
            to='/about/'
            className='text-gray-400 hover:text-white transition-colors'
          >
            About
          </NavLink>
        </nav>
        <button className='border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white'>
          Subscribe
        </button>
      </div>
    </header>
  );
};

export default Header;
