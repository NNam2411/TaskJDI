import React from "react";
import Car from "./Car";

const Garage = () => {
  const cars = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1622185683580-c32eeac1e499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      name: "BMW",
      model: "X5",
      year: 2019,
      price: 100000,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1660108254757-2d53b668a011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      name: "Mercedes",
      model: "E",
      year: 2020,
      price: 120000,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      name: "Audi",
      model: "A6",
      year: 2018,
      price: 90000,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1605127515481-9a73eec8d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      name: "Lexus",
      model: "RX",
      year: 2017,
      price: 80000,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-10">
      {cars.map((car) => (
        <Car
          key={car.id}
          img={car.img}
          name={car.name}
          model={car.model}
          year={car.year}
          price={car.price}
        />
      ))}
    </div>
  );
};

export default Garage;
