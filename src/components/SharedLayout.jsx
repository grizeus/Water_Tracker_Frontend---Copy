import { Header, Loader } from 'components';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './Wrapper/Wrapper.jsx';

const SharedLayout = () => {
  const location = useLocation();
  const hideHeaderOnPages = ['/404']; // Сторінки, на яких не відображається Header

  return (
    <Wrapper>
      {/* <Header /> */}
      {!hideHeaderOnPages.includes(location.pathname) && <Header />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={false}
        transition={Zoom}
      />
    </Wrapper>
  );
};

export default SharedLayout;
