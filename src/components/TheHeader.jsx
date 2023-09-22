import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import connectToMetaMask, {
  CheckNetwork,
  CheckBalance,
} from "../utils/etherUtils";

const TheHeader = () => {
  // Connect to MetaMask, get address, get balance
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [balanceRaw, setBalanceRaw] = useState(0);

  const connect = async () => {
    try {
      const signer = await connectToMetaMask();
      const addr = await signer.address;
      setAddress(addr);
      setIsConnected(true);
      // Get Balance
      const balancer = await CheckBalance(addr);
      console.log("file: TheHeader.jsx:24 || connect || balancer:", balancer);
      setBalanceRaw(balancer);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };
  // Process BigInt into int
  let balanceString = balanceRaw.toString();
  const balanceFloat = parseFloat(balanceString) / 10 ** 18;

  // Check Network
  const [isConnectBSCT, setIsConnectBSCT] = useState(false);
  useEffect(() => {
    const checkBSCT = async () => {
      const isConnected = await CheckNetwork();
      setIsConnectBSCT(isConnected);
    };

    checkBSCT();
  });

  return (
    <header className="w-[400px] h-fit xl:w-full py-10 pl-7 gap-x-7 fixed flex justify-start items-center font-bold  bg-[#B9C0DE]">
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
      {isConnected === false && (
        <div className="flex flex-row justify-center items-center absolute right-5">
          <button
            className="h-10 w-full px-7 bg-gradient-to-r from-[#ff5858] to-[#b47878] text-white flex justify-center items-center rounded-lg"
            // eslint-disable-next-line no-undef
            onClick={connect}
          >
            Connect to MetaMask
          </button>
        </div>
      )}

      {isConnected && isConnectBSCT && balanceRaw != null && (
        <div className="flex flex-row justify-center items-center absolute right-5 gap-3">
          <div className="">Address: </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 w-full px-7 bg-gradient-to-r from-[#76d5a7] to-[#3092a6] text-white flex justify-center items-center rounded-lg">
              {address}
            </div>
            <div className="h-10 w-full px-7 bg-gradient-to-r from-[#76bcd5] to-[#3e30a6] text-white flex justify-center items-center rounded-lg">
              {balanceFloat} BNB
            </div>
          </div>
        </div>
      )}
      {isConnected && isConnectBSCT === false && (
        <div className="flex flex-row justify-center items-center absolute right-5">
          <div className="mr-5">Address: </div>
          <div className="h-10 w-full px-7 bg-gradient-to-r from-[#d45555] to-[#c25d5d] text-white flex justify-center items-center rounded-lg">
            Wrong Network
          </div>
        </div>
      )}
    </header>
  );
};

export default TheHeader;
