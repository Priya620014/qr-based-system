import React from 'react';
import Header from '../components/navbar';
import Footer from '../components/footer';

function About() {
  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      <Header />

      <main style={{ paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          padding: '60px 24px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '800', marginBottom: '16px' }}>
            About <span style={{ color: '#f97316' }}>Zykaa</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Zykaa is a smart QR-based canteen ordering system built to make dining faster, contactless, and hassle-free.
          </p>
        </section>

        {/* Story */}
        <section style={{ padding: '50px 24px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{ color: '#f97316', fontSize: '20px', fontWeight: '700', marginBottom: '14px' }}>🚀 Our Story</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.9', fontSize: '15px' }}>
              Zykaa was born out of a simple frustration — long canteen queues and slow manual ordering. We built a system where customers simply scan a QR code on their table, browse the menu, place an order, and pay — all from their phone. No waiting, no confusion, just food.
            </p>
          </div>

          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{ color: '#f97316', fontSize: '20px', fontWeight: '700', marginBottom: '14px' }}>🎯 Our Mission</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.9', fontSize: '15px' }}>
              To modernize canteen experiences using technology — making ordering seamless, payments secure, and food delivery faster for every student and staff member.
            </p>
          </div>

          {/* Team */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <h2 style={{ color: '#f97316', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>👩‍💻 Meet the Developer</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', flexShrink: 0
              }}>👩</div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}>Priyanshi</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '4px' }}>Full Stack Developer · React · Node.js · MongoDB</p>
                <p style={{ color: '#f97316', fontSize: '13px', marginTop: '6px' }}>priyanshiraj323@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
