import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import connectToMetaMask from "../utils/etherUtils";

const TheHeader = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const connect = async () => {
      try {
        const signer = await connectToMetaMask();
        console.log("file: TheHeader.jsx:12 || connect || signer:", signer);
        const addr = await signer.getAddress();
        setAddress(addr);
        // setAddress(signer.address);
        console.log("file: TheHeader.jsx:15 || connect || address:", address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    connect();
  }, [address]); // Chỉ chạy một lần khi component được render

  return (
    <header className="w-[400px] xl:w-full py-5 pl-7 gap-x-7 fixed flex justify-start items-center font-bold  bg-[#B9C0DE]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg"
            : "h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/food"
        className={({ isActive }) =>
          isActive
            ? "h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg"
            : "h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg"
        }
      >
        Food Store
      </NavLink>
      <NavLink
        to="/hello"
        className={({ isActive }) =>
          isActive
            ? "h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg"
            : "h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg"
        }
      >
        Hello Page
      </NavLink>
      {/* address of crypto mask */}
      <div className="flex flex-row justify-center items-center absolute right-5">
        <div className="mr-5">Address: </div>
        <div className="h-10 w-full px-7 bg-gradient-to-r from-[#76d5a7] to-[#3092a6] text-white flex justify-center items-center rounded-lg">
          {address}
        </div>
      </div>
    </header>
  );
};

export default TheHeader;
