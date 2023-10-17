import { Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";

const EventContract = () => {
  // Address 1 0x529eEd39B15020F63ED169E0aCFeEB80f30cF1B9
  // Address 2 0x42a284D62F2d948ABA06FAFE51884805a162806F
  const [signer, setSigner] = useState(null);
  const provider = new ethers.BrowserProvider(window.ethereum);

  // getSigner
  useEffect(() => {
    console.log("Provider", provider);
    const getSigner = async () => {
      const signer = await provider.getSigner();
      setSigner(signer);
      console.log(signer);
    };
    getSigner();
  }, []);

  const contractAddress = "0x73d8dbA188E55C3090ECe363aF24B88c3C05ddF3";
  // const abi = [
  //   "event Deposit(address _addr, uint256 timestamp, uint256 amount)",
  //   "event Withdraw(address _addr, uint256 amount)",
  // ]; // ABI của smart contract

  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_addr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_addr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "transactions",
      outputs: [
        {
          internalType: "uint256",
          name: "totalBalance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  const [timestamp, setTimestamp] = useState();
  const [timestampFormat, setTimestampFormat] = useState();
  // Formatted timestamp
  function transferDate(time) {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setTimestampFormat(formattedDate);
    console.log(formattedDate);
  }
  const listenToEvent = async () => {
    console.log("Event Connected");
    await contract.on("Deposit", (from, timestamp, amount) => {
      console.log(from, timestamp, amount);
      setAddress(from);
      setAmount(parseFloat(amount));
      transferDate(parseFloat(timestamp));
      setTimestamp(timestamp);
    });
    await contract.on("Withdraw", (from, amount) => {
      console.log(from, amount);
      setAddress(from);
      setAmount(parseFloat(amount));
      transferDate(parseFloat(timestamp));
      setTimestamp("NONE");
    });
  };
  listenToEvent();
  // Get detail of the event

  //   // Lắng nghe sự kiện "Withdraw"
  //   useEffect(() => {
  //     const withdrawEventListener = contract.on("Withdraw", (from, amount) => {
  //       setWithdrawals((prevWithdrawals) => [
  //         ...prevWithdrawals,
  //         { from, amount },
  //       ]);
  //     });

  //     return () => {
  //       withdrawEventListener.off();
  //     };
  //   }, []);

  // Lắng nghe sự kiện "Transfer"
  //   address: 0x.....
  //   deposit: 1000
  //   time: 11/10/2023
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border solid border-black rounded-md p-7">
        <div className="text-2xl font-bold">Detail of the Event</div>
        <div>
          <p>Address: {address}</p>
          <p>Amount: {amount}</p>
          <p>Date: {timestampFormat}</p>
        </div>
      </div>
    </div>
  );
};

export default EventContract;
