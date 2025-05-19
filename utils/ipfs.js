export async function uploadToIPFS(content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', blob);

  const res = await fetch("https://api.web3.storage/upload", {
    method: 'POST',
    headers: {
      Authorization: `Bearer YOUR_WEB3_STORAGE_API_KEY`
    },
    body: formData
  });

  if (!res.ok) {
    throw new Error("IPFS upload failed");
  }

  const result = await res.json();
  return `https://ipfs.io/ipfs/${result.cid}`;
}
