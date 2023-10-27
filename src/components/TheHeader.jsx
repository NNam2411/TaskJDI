/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { ethers, parseEther, parseUnits } from 'ethers';
import { NavLink } from 'react-router-dom';
import { connectToMetaMask, CheckNetwork, CheckBalance } from '../utils/etherUtils';

function TheHeader() {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectBSCT, setIsConnectBSCT] = useState(false); // Check Network
  const [balanceRaw, setBalanceRaw] = useState(0);
  const provider = new ethers.BrowserProvider(window.ethereum);

  const connect = async () => {
    const signer = await connectToMetaMask();
    // Get Address
    const addr = await signer.address;
    setAddress(addr);
    setIsConnected(true);
    // Get Balance
    const balancer = await CheckBalance(addr);
    setBalanceRaw(parseFloat(balancer));
  };

  // Function Check network connect and check if this is BSC Testnet
  const checkBSCT = async () => {
    const isConnectedNW = await CheckNetwork();
    if (isConnectedNW) {
      setIsConnectBSCT(isConnectedNW);
    } else {
      setIsConnectBSCT(false);
      onNetworkChange();
    }
  };

  useEffect(() => {
    connect();
    // Funtion change the network to BSC Testnet
    const onNetworkChange = async () => {
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      console.log(networkId);
      // bsb testnet 97n , bsb testnet name: bsc-testnet 0x61
      // polygon testnet 80001n , polygon testnet name: matic-mumbai 0x13881
      if (networkId !== 80001n) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }]
        });
        window.location.reload();
      }
      checkBSCT();
    };
    if (isConnectBSCT === false) {
      // Add event change network
      provider.on('network', onNetworkChange);
      checkBSCT();
    }
    return () => {
      provider.off('network', onNetworkChange);
    };
  }, [isConnectBSCT]);

  return (
    <header className="w-[400px] h-fit xl:w-full py-10 pl-7 gap-x-7 fixed flex justify-start items-center font-bold  bg-[#B9C0DE]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg'
            : 'h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg'
        }>
        Home
      </NavLink>
      <NavLink
        to="/food"
        className={({ isActive }) =>
          isActive
            ? 'h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg'
            : 'h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg'
        }>
        Food Store
      </NavLink>
      <NavLink
        to="/hello"
        className={({ isActive }) =>
          isActive
            ? 'h-10 w-48 bg-gradient-to-r from-[#7DC383] to-[#699C78] text-white flex justify-center items-center rounded-lg'
            : 'h-10 w-48 text-[#2E327180] flex justify-center items-center rounded-lg'
        }>
        Hello Page
      </NavLink>

      {/* address of crypto mask */}
      {isConnected === false && (
        <div className="flex flex-row justify-center items-center absolute right-5">
          <button
            type="button"
            className="h-10 w-full px-7 bg-gradient-to-r from-[#ff5858] to-[#b47878] text-white flex justify-center items-center rounded-lg"
            onClick={connect}>
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
              {balanceRaw / 10 ** 18} BNB
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
}

export default TheHeader;
