import React, { useState } from 'react';
import Header from '../components/navbar';
import Footer from '../components/footer';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: '#0f0f0f',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Segoe UI', sans-serif"
  };

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
            Get in <span style={{ color: '#f97316' }}>Touch</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Have a question, feedback, or issue? We'd love to hear from you.
          </p>
        </section>

        <section style={{
          padding: '50px 24px',
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '📧', label: 'Email', value: 'priyanshiraj323@gmail.com' },
              { icon: '📞', label: 'Phone', value: '2872608022' },
              { icon: '📍', label: 'Location', value: 'Campus Canteen, India' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 8am – 8pm' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '14px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{ fontSize: '22px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: '#f97316', fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '30px 24px'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>We'll get back to you soon.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                  style={{ marginTop: '20px', background: 'transparent', border: '1px solid #f97316', color: '#f97316', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Send a Message</h3>
                <input
                  name="name" placeholder="Your Name" value={form.name}
                  onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
                <input
                  name="email" placeholder="Your Email" value={form.email} type="email"
                  onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
                <textarea
                  name="message" placeholder="Your Message" value={form.message} rows={5}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
                <button type="submit" style={{
                  background: '#f97316',
                  color: 'white',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                  onMouseEnter={e => e.target.style.opacity = '0.9'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
