import React, { useEffect, useState } from 'react';

function AdminHome() {
  const [tables, setTables] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tables')
      .then(res => res.json())
      .then(async (data) => {
        setTables(data);
        const codes = {};
        await Promise.all(
          data.map(async (table) => {
            const res = await fetch(`http://localhost:5000/api/qr/${table._id}`);
            const html = await res.text();
            const match = html.match(/src="(data:image\/png;base64,[^"]+)"/);
            if (match) codes[table._id] = match[1];
          })
        );
        setQrCodes(codes);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tables. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: 'orange' }}>🍽️ ZYKAA — Table QR Codes</h1>
      {loading && <p style={{ textAlign: 'center' }}>Loading QR codes...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginTop: '30px' }}>
        {tables.map(table => (
          <div key={table._id} style={{
            border: '2px solid orange', borderRadius: '12px',
            padding: '20px', textAlign: 'center', width: '200px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: 'orange', marginBottom: '10px' }}>Table {table.TableNo}</h3>
            {qrCodes[table._id]
              ? <img src={qrCodes[table._id]} alt={`QR Table ${table.TableNo}`} style={{ width: '160px', height: '160px' }} />
              : <p style={{ color: '#aaa' }}>Loading...</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
