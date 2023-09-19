import { ethers } from "ethers";

const connectToMetaMask = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.enable();
      const signer = provider.getSigner();
      return signer;
    } else {
      throw new Error(
        "Metamask not detected. Please install and connect Metamask."
      );
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw error;
  }
};

export default connectToMetaMask;
