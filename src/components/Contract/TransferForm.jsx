import React, { useState } from "react";
import connectToMetaMask from "../../utils/etherUtils";
import { parseEther } from "ethers";

const TransferForm = () => {
  // Address 1 0x529eEd39B15020F63ED169E0aCFeEB80f30cF1B9
  // Address 2 0x42a284D62F2d948ABA06FAFE51884805a162806F

  // Transfer BNB
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [isTransfer, setIsTransfer] = useState(false);
  const transfer = async () => {
    try {
      console.log("file: HomePage.jsx:23 || transfer || toAddress:", toAddress);
      console.log("file: HomePage.jsx:23 || transfer || amount:", amount);

      const signer = await connectToMetaMask();

      const transaction = await signer.sendTransaction({
        to: toAddress,
        value: parseEther(amount),
      });
      console.log(
        "file: HomePage.jsx:27 || transfer || transaction:",
        transaction
      );
      console.log("Transfer success");
      alert("Transfer success");
      setIsTransfer(true);
    } catch (error) {
      console.log(error, "Transfer fail");
    }
  };
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl font-bold">Transaction Form</h2>
        <div className="mt-6">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            className="border border-black text-sm rounded-lg p-1 text-black"
            required
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="balance">Amount(BNB): </label>
          <input
            type="text"
            id="balance"
            className="border border-black text-sm rounded-lg p-1"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex justify-center align-middle">
          <button
            className="bg-slate-500 rounded-md px-2 py-1 mt-4 mx-auto"
            onClick={() => transfer()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
