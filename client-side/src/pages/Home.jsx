import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Homepage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableNo, setTableNo] = useState(null);

  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id);
      axios.get(`${process.env.REACT_APP_API_URL}/api/tables/${id}`)
        .then(res => setTableNo(res.data.TableNo))
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleViewMenu = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/current_user`, { withCredentials: true });
      if (res.data && res.data.user) navigate(`/table/${id}/menu`);
      else window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    } catch {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    }
  };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      <Header />

      <main style={{ paddingTop: '60px' }}>
        <Carousel />

        {/* Welcome Section */}
        <section style={{
          padding: '50px 24px',
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          textAlign: 'center'
        }}>
          {tableNo && (
            <span style={{
              background: '#f97316',
              color: 'white',
              padding: '5px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              📍 Table {tableNo}
            </span>
          )}
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '800', marginBottom: '16px' }}>
            Welcome to <span style={{ color: '#f97316' }}>Zykaa</span> Canteen
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: '1.8'
          }}>
            Your smart, contactless way to order food. Browse our menu, place your order, and pay securely — no queues, no waiting. Just fresh, delicious meals delivered right to your table.
          </p>
          <button onClick={handleViewMenu} style={{
            padding: '14px 48px',
            fontSize: '16px',
            fontWeight: '700',
            background: '#f97316',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 6px 20px rgba(249,115,22,0.4)'
          }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            View Menu →
          </button>
        </section>

        {/* Features Section */}
        <section style={{ padding: '50px 24px', background: '#0f0f0f' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { icon: '📱', title: 'Scan & Order', desc: 'Just scan the QR on your table and start ordering instantly.' },
              { icon: '🍽️', title: 'Fresh Food', desc: 'Freshly prepared meals with quality ingredients every day.' },
              { icon: '💳', title: 'Secure Payment', desc: 'Pay safely via Razorpay — UPI, cards, wallets all accepted.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Your order reaches your table in minutes, not hours.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
