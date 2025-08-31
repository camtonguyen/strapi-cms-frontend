import { Outlet } from 'react-router';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { createQueryLoader } from '~/utils/queryLoader';
import { GLOBAL_QUERY } from '~/queries/global/global';

// Only load global data in the layout
export const loader = createQueryLoader(GLOBAL_QUERY, 'globalQueryRef');

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main className='container mx-auto py-12 min-h-[50vh]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
