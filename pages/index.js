import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(null);

  const checkAddress = async () => {
    const res = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address })
    });

    const data = await res.json();
    if (data.found) {
      setStatus('🎉 Congratulations! Your wallet is on the list!');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
      setStatus('❌ Sorry, this wallet is not on the list.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Check Your Wallet</h1>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Enter your wallet address..."
        style={{ padding: '10px', width: '300px' }}
      />
      <br /><br />
      <button onClick={checkAddress} style={{ padding: '10px 20px' }}>Check</button>
      <br /><br />
      {status && <div style={{ fontSize: '20px' }}>{status}</div>}
    </div>
  );
}
