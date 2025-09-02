import { Outlet } from 'react-router';
import { Header, Footer, ToastProvider } from '~/components/';
import { createQueryLoader } from '~/utils/queryLoader';
import { GLOBAL_QUERY } from '~/queries/global/global';

// Only load global data in the layout
export const loader = createQueryLoader(GLOBAL_QUERY, 'globalQueryRef');

const MainLayout = () => {
  return (
    <ToastProvider>
      <div className='min-h-screen bg-black text-white px-4 min-lg:px-2'>
        <Header />
        <main className='container mx-auto py-12 min-h-[50vh] flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default MainLayout;
