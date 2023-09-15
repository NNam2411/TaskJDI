import React from "react";

const Food = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center">Food</h1>
      <img src={props.img} alt="" className="h-auto w-48 rounded-md" />
      <h2>Food Name: {props.name}</h2>
      <h3>Price: {props.price}</h3>
    </div>
  );
};

export default Food;
