import React from "react";

const Car = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center">Car</h1>
      <h3 className="text-xl text-center">
        Name: {props.name} {props.model}
      </h3>
      <h3 className="text-[#525050]">Year {props.year}</h3>
      <h3 className="text-[#525050] font-semibold">Price {props.price}</h3>
      <img className="h-auto w-48 rounded-md" src={props.img} alt="" />
    </div>
  );
};

export default Car;
