import React from 'react';
import Car from './Car';
import cars from '../../data/CarObj.json';

function Garage() {
  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-3xl font-bold underline">My Garage</h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
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
    </div>
  );
}

export default Garage;
