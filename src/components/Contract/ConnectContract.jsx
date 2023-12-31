/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ethers, parseEther, parseUnits } from 'ethers';
import { ABI, ContractAddr } from '../../utils/config';

function ConnectContract() {
  // Address 1 0x529eEd39B15020F63ED169E0aCFeEB80f30cF1B9
  // Address 2 0x42a284D62F2d948ABA06FAFE51884805a162806F
  const [valueGet, setValueGet] = useState(0);
  const [valueSet, setValueSet] = useState(0);
  const [signer, setSigner] = useState(null);

  const provider = new ethers.BrowserProvider(window.ethereum);

  // getSigner
  const getSigner = async () => {
    const signer = await provider.getSigner();
    setSigner(signer);
  };
  // Create the contract
  const contract = new ethers.Contract(ContractAddr, ABI, signer);

  const getDataFromContract = async () => {
    try {
      const value = await contract.get();
      const valueFloat = parseFloat(value);
      setValueGet(valueFloat);
      console.log('Current value:', valueGet);
    } catch (error) {
      console.error('Error fetching data from contract:', error);
    }
  };

  const setDataOnContract = async (newValue) => {
    try {
      await provider.send('eth_requestAccounts', []);
      const transaction = await contract.set(newValue);
      await transaction;
      console.log('Transaction:', transaction);
      alert('Transaction complete');
      console.log('Transaction complete');
    } catch (error) {
      console.error('Error setting data on contract:', error);
    }
  };
  useEffect(() => {
    getSigner();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="w-fit border solid m-3 p-10 rounded-lg">
        <h1 className="text-2xl font-bold">Simple Storage</h1>
        <button
          type="button"
          onClick={getDataFromContract}
          className="bg-slate-200 rounded-lg py-1 px-4 mt-5">
          Get Data
        </button>
        <div className="mt-5">
          Value:
          {valueGet}
        </div>
        <input
          type="text"
          className="border solid"
          value={valueSet}
          onChange={(e) => setValueSet(e.target.value)} // Listen the onChange event
        />
        <button
          type="button"
          onClick={() => setDataOnContract(valueSet)}
          className="bg-slate-200 rounded-lg py-1 px-4 mt-5">
          Set Data
        </button>
      </div>
    </div>
  );
}

export default ConnectContract;
