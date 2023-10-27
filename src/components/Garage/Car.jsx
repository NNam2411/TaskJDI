import React, { useEffect, useState } from 'react';
import { ethers, parseEther, parseUnits } from 'ethers';
import { notification } from 'antd';
import { transferDate } from '../../utils/etherUtils';
import { ABI, ContractAddr, address1, address2 } from '../../utils/config';

function Car(props) {
  const [signer, setSigner] = useState(null);
  const [addressSend, setAddressSend] = useState();
  const [addressReceive, setAddressReceive] = useState();
  const [amount, setAmount] = useState();
  // antd notification
  const [api, contextHolder] = notification.useNotification();
  const provider = new ethers.BrowserProvider(window.ethereum); // provider

  const GetSigner = async () => {
    const signer = await provider.getSigner();
    setSigner(signer);
  };
  const contract = new ethers.Contract(ContractAddr, ABI, signer); // Create the contract
  const openNotification = (addressSend, addressReceive, amount) => {
    api.open({
      message: 'Transaction Details',
      description:
        `Address Send: ${addressSend} \n` +
        `Address Receive: ${addressReceive} \n` +
        `Amount: ${amount} \n`,
      duration: 1000
    });
  };
  const ListenToEvent = async () => {
    console.log('Car || Event Connected');
    await contract.on('Transfer', (from, to, value) => {
      setAddressSend(from);
      setAddressReceive(to);
      setAmount(parseFloat(value));
      console.log('Transaction Details: ', addressSend, addressReceive, parseFloat(value));
      openNotification(addressSend, addressReceive, parseFloat(value));
    });
  };

  const HandleTransaction = async (price) => {
    try {
      console.log('Transaction Details: ', address1, address2, ContractAddr, price);
      // // Estimate the gas required for the transaction
      // const estimatedGas = await contract.estimateGas.transfer(address2, parseUnits(price));
      // // Add some extra gas to the estimated gas
      // const gasPrice = 20;
      // const gasLimit = estimatedGas + 10000;
      // const tx = contract.transfer(address2, parseUnits(price), {
      //   gasLimit: gasLimit,
      //   gasPrice: gasPrice
      // });
      const priceE = price / 10 ** 18;
      const tx = await contract.transfer(address2, price, { gasLimit: 3000000 });
      await tx.wait();
      await ListenToEvent();
      if (tx) {
        console.log('Transaction successful!', tx);
        openNotification(tx.from, tx.to, parseFloat(price));
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const transferTest = async (addr, amount) => {
  //   try {
  //     const transaction = await signer.sendTransaction({
  //       to: addr,
  //       value: parseEther(amount)
  //     });
  //     openNotification(signer, addr, amount);
  //     console.log('file: Car.jsx:71 || transfer || transaction:', transaction);
  //   } catch (error) {
  //     console.log(error, 'Transfer fail');
  //   }
  // };
  useEffect(() => {
    GetSigner();
    ListenToEvent();
    return () => {
      contract.removeAllListeners();
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      {contextHolder}
      <h1 className="text-3xl text-center">Car</h1>
      <h3 className="text-xl text-center">
        Name: {props.name} {props.model}
      </h3>
      <h3 className="text-[#525050]">Year: {props.year}</h3>
      <h3 className="text-[#525050] font-semibold">Price: {props.price}</h3>
      <img className="h-auto w-48 rounded-md" src={props.img} alt="" />
      <button
        className="py-2 px-4 bg-[#4eb556] text-white rounded-md mt-2 hover:bg-[#61da6b]"
        type="button"
        onClick={() => HandleTransaction(props.price)}>
        Buy now
      </button>
    </div>
  );
}

export default Car;
