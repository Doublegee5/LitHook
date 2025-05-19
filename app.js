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
  const text = document.getElementById('literatureInput').value;

  if (!text) return alert("Please write something first!");

  const blob = new Blob([text], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', blob);

  const res = await fetch("https://api.web3.storage/upload", {
    method: 'POST',
    headers: {
      Authorization: `Bearer YOUR_WEB3_STORAGE_API_KEY`
    },
    body: formData
  });

  const result = await res.json();
  const cid = result.cid;
  const link = `https://ipfs.io/ipfs/${cid}`;

  document.getElementById('ipfsLink').innerHTML = `Content uploaded: <a href="${link}" target="_blank">${link}</a>`;
});
