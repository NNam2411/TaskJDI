import React from "react";
import Food from "./Food";
import ConnectContract from "../Contract/ConnectContract";

const FoodStore = () => {
  const foods = [
    {
      name: "Cake",
      price: "$10",
      img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    },
    {
      name: "pudding",
      price: "$20",
      img: "https://images.unsplash.com/photo-1637264596042-fcf205a81e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
    {
      name: "ice scream",
      price: "$30",
      img: "https://plus.unsplash.com/premium_photo-1666920428775-ec9ddeaae574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold underline"> My Food Store</h1>
      </div>
      <div className="pt-8">
        <div className="grid grid-cols-3 gap-10">
          {foods.map((food) => (
            <Food name={food.name} price={food.price} img={food.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodStore;
