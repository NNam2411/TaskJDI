import React from "react";
import Garage from "../components/Garage/Garage";
import TheHeader from "../components/TheHeader";

const HomePage = () => {
  return (
    <div className="">
      <TheHeader></TheHeader>
      <div className="">
        <div className="flex items-center justify-center pt-5">
          <h1 className="text-3xl font-bold underline"> My Garage</h1>
        </div>
        <div className="pt-8">
          <Garage></Garage>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
