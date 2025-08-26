import { Outlet } from 'react-router';
import Header from '~/components/Header';

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main className='container mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
