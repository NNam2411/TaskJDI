import React from "react";
import Garage from "./components/Garage/Garage";

const HomePage = () => {
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-center">
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
