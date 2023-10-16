import React, { useState } from "react";
import TheHeader from "../components/TheHeader";
import { Outlet } from "react-router-dom";
import ConnectContract from "../components/Contract/ConnectContract";
import TransferForm from "../components/Contract/TransferForm";
import EventContract from "../components/Contract/EventContract";

const HomePage = () => {
  return (
    <div className="">
      <TheHeader></TheHeader>
      <div className="pt-40">
        <div className="flex justify-center">
          <TransferForm></TransferForm>
        </div>

        <div className="pt-5">
          <ConnectContract></ConnectContract>
        </div>
        <div className="pt-5">
          <EventContract></EventContract>
        </div>

        <div className="flex items-center justify-center mt-5">
          <h1 className="text-3xl font-bold underline">My Garage</h1>
        </div>
        <div className="pt-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
