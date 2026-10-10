import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';
import Fetchitems from '../Components/Fetchitems';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../Components/LoadingSpinner';
import AuthModal from '../Components/AuthModal';

const App = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Header />
      <Fetchitems />
      <AuthModal />
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </>
  );
};

export default App;