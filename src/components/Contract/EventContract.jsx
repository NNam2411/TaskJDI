import { Contract, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { ABI, ContractAddr } from '../../utils/config';
import { TransferDate } from '../../utils/etherUtils';

function EventContract() {
  // Address 1 0x529eEd39B15020F63ED169E0aCFeEB80f30cF1B9
  // Address 2 0x42a284D62F2d948ABA06FAFE51884805a162806F
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState();
  const [addressReceived, setAddressReceived] = useState();
  const [amount, setAmount] = useState();
  const [timestamp, setTimestamp] = useState();
  const [timestampFormat, setTimestampFormat] = useState();
  const provider = new ethers.BrowserProvider(window.ethereum);
  // getSigner
  const getSigner = async () => {
    const signer = await provider.getSigner();
    setSigner(signer);
    console.log(signer);
  };

  const contract = new ethers.Contract(ContractAddr, ABI, signer);

  // Formatted timestamp
  // function TransferDate(time) {
  //   const date = new Date(time * 1000);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');
  //   const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   setTimestampFormat(formattedDate);
  //   console.log(formattedDate);
  // }
  const ListenToEvent = async () => {
    console.log('Event Connected');

    // await contract.on('Deposit', (from, timestamp, amount) => {
    //   console.log(from, timestamp, amount);
    //   setAddress(from);
    //   setAmount(parseFloat(amount));
    //   TransferDate(parseFloat(timestamp));
    //   setTimestamp(timestamp);
    // });
    // await contract.on('Withdraw', (from, amount) => {
    //   console.log(from, amount);
    //   setAddress(from);
    //   setAmount(parseFloat(amount));
    //   TransferDate(parseFloat(timestamp));
    //   setTimestamp('NONE');
    // });

    await contract.on('Transfer', (from, to, value) => {
      console.log(from, to, value);
      setAddress(from);
      setAddressReceived(to);
      setAmount(value);
    });
  };
  ListenToEvent();
  useEffect(() => {
    console.log('Provider', provider);

    getSigner();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border solid border-black rounded-md p-7">
        <div className="text-2xl font-bold">Detail of the Event</div>
        <div>
          <p>
            Address:
            {address}
          </p>
          <p>
            Address Recieve:
            {addressReceived}
          </p>
          <p>
            Amount:
            {amount}
          </p>
          <p>
            Date:
            {timestampFormat}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventContract;
