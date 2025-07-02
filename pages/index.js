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
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStatus('❌ Sorry, this wallet is not on the list.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <img
        src="/banner.jpg"
        alt="Banner"
        style={{
          maxWidth: '100%',
          height: 'auto',
          marginBottom: '40px',
          borderRadius: '12px'
        }}
      />

      <h1 style={{ marginBottom: '20px' }}>Check Your Wallet</h1>

      <input
        type="text"
        placeholder="Enter your wallet address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      <br /><br />
      <button
        onClick={checkAddress}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Check
      </button>
      <br /><br />
      {status && <div style={{ fontSize: '20px' }}>{status}</div>}
    </div>
  );
}
