import { ethers } from "ethers";

export const connectToMetaMask = async () => {
  try {
    if (!window.ethereum) {
      throw new Error(
        "Metamask not detected. Please install and connect Metamask."
      );
    }
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      // Lấy tài khoản
      const signer = provider.getSigner();
      return signer;
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw error;
  }
};

export const CheckNetwork = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  console.log("file: etherUtils.js:25|| CheckNetwork || network:", network);
  const networkId = network.chainId;
  const networkName = network.name;
  if (networkId === 97n && networkName === "bnbt") {
    console.log("Ethers BSC succes:", "Connected to BSC Testnet");
    return true;
  } else {
    console.log("Ethers BSC warning:", "Please connected to BSC Testnet");
    return false;
  }
};

export const getNetworkInfo = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  console.log(
    "file: etherUtils.js:25|| connectToMetaMask || network:",
    network
  );
  const networkId = network.chainId;
  console.log("file: etherUtils.js:49 || getNetwork || networkId:", networkId);
  const networkName = network.name;
  console.log(
    "file: etherUtils.js:51 || getNetwork || networkName:",
    networkName
  );
  return networkId, networkName;
};

export const CheckBalance = async (address) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);

  console.log("file: etherUtils.js:43 || CheckBalance || balance:", balance);
  console.log(
    "file: etherUtils.js:44 || CheckBalance || balance:",
    typeof balance
  );
  return balance;
};

export default connectToMetaMask;
