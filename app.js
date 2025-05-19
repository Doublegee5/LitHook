import { uploadToIPFS } from './utils/ipfs.js';

let provider;

document.getElementById('connectWallet').addEventListener('click', async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = `Wallet: ${address}`;
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById('uploadToIPFS').addEventListener('click', async () => {
  const content = document.getElementById('literatureInput').value.trim();
  if (!content) return alert("Please write something first!");

  const link = await uploadToIPFS(content);
  document.getElementById('ipfsLink').innerHTML = `Uploaded: <a href="${link}" target="_blank">${link}</a>`;
});
