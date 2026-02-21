
import React from 'react';
import Header from '../components/navbar';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import { useParams } from 'react-router-dom';
import {useEffect} from 'react';

function Homepage() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id);
    }
  }, [id]);
  return (
    <div style={{backgroundColor:'white'}}>
      <Header />
      <main style={{ paddingTop: '65px' }}>
        <Carousel />
        <section style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: 'orange'
        }}>
          <h2 style={{ color: 'white',  }}>Welcome to Zykaa</h2>
          <p style={{ color: 'white',padding:'0px 60px'}}>
            "Welcome to MyCanteen — your smart, contactless way to order food! Simply scan the QR code on your table, browse our menu, place your order, and pay securely in just a few taps. No queues, no waiting — just fresh, delicious meals delivered right to your table. With real-time order tracking and a smooth, easy-to-use interface, MyCanteen makes dining faster, safer, and more convenient than ever."
            Our canteen offers a variety of delicious and affordable meals made with hygiene and love. Whether you're here for breakfast, lunch, or a late-night snack, we serve fresh and fast. Scan, order, and enjoy — no wait lines, no hassle.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
