/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';
import { useState } from 'react';
import React from 'react';

export const connectToMetaMask = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('Metamask not detected. Please install and connect Metamask.');
    }
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      // Lấy tài khoản
      const signer = provider.getSigner();
      return signer;
    }
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};
export const CheckNetwork = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const networkName = network.name;

  // if (networkId === 97n && networkName === "bsc-testnet")
  if (networkId === 80001n && networkName === 'matic-mumbai') {
    console.log(
      'Ethers Netword success:',
      `Connected to right network Name: ${networkName} , ID: ${networkId}`
    );
    return true;
  }
  console.log('Ethers BSC warning:', 'Please connected to BSC Testnet');
  return false;
};
export function TransferDate(time) {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  setTimestampFormat(formattedDate);
  console.log(formattedDate);
}
export const getNetworkInfo = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();

  const networkId = network.chainId;
  const networkName = network.name;

  return [networkId, networkName];
};

export const CheckBalance = async (address) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return balance;
};

// const initial = {
//   address: '',
//   balance: '',
// };
// export const ConnectNCheck = async () => {
//   const [wallet, setWallet] = useState(initial);
//   try {
//     const selectAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//     setWallet((preState) => ({
//       ...preState,
//       address: selectAccounts[0],
//     }));

//     window.ethereum.on('accountsChanged', async (accounts) => {
//       setWallet((preState) => ({
//         ...preState,
//         address: accounts[0],
//       }));
//     });
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const chainId = await provider.getChainId();

//     if (chainId !== 80001) {
//       await window.ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [
//           {
//             chainId: '0x13881',
//             chainName: 'Mumbai Testnet',
//             nativeCurrency: {
//               name: 'MATIC',
//               symbol: 'MATIC',
//               decimals: 18,
//             },
//             rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
//             blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com'],
//           },

// {
//   chainId: "0x61",
//   chainName: "BSC Testnet",
//   nativeCurrency: {
//     name: "BNB",
//     symbol: "BNB",
//     decimals: 18,
//   },
// },

//         ],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getSigner = async () => {
// const [signer, setSigner] = useState(null);
//   const signer = await provider.getSigner();
//   setSigner(signer);
// };

// // Funtion change the network to BSC Testnet
// export const OnNetworkChange = async () => {
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const network = await provider.getNetwork();
//   const networkId = network.chainId;
//   console.log(networkId);
//   // Switch to BSC Testnet

//   // bsb testnet 97n , bsb testnet name: bsc-testnet 0x61
//   // polygon testnet 80001n , polygon testnet name: matic-mumbai 0x13881
//   if (networkId !== 80001n) {
//     await window.ethereum.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: '0x13881' }],
//     });
//     window.location.reload();
//   }
//   // Function Check network connect and check if this is BSC Testnet
//   const [isConnectBSCT, setIsConnectBSCT] = useState(false);

//   const checkBSCT = async () => {
//     const isConnectedNW = await CheckNetwork();
//     if (isConnectedNW) {
//       setIsConnectBSCT(isConnectedNW);
//     } else {
//       setIsConnectBSCT(false);
//       onNetworkChange();
//     }
//   };
// };

export default connectToMetaMask;
