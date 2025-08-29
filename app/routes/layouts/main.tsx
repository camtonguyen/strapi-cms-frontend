import { Outlet } from 'react-router';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { globalLoader } from '~/queries/global/global';

// Export the loader with the correct name for React Router
export const loader = globalLoader;

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main className='container mx-auto flex-1 min-h-[50vh]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
