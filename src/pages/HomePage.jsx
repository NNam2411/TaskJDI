import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom';
import TheHeader from '../components/TheHeader';
import ConnectContract from '../components/Contract/ConnectContract';
import TransferForm from '../components/Contract/TransferForm';
import EventContract from '../components/Contract/EventContract';

function HomePage() {
  return (
    <div className="">
      <TheHeader />
      <div className="pt-40">
        <div className="flex justify-center">
          <TransferForm />
        </div>

        {/* <div className="pt-5">
          <ConnectContract />
        </div> */}
        <div className="pt-5">
          <EventContract />
        </div>

        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
