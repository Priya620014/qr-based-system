
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/logout'

function Menu() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/menus')
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleQuantityChange = (menuItemId, quantity) => {
    setSelectedItems(prev => ({
      ...prev,
      [menuItemId]: parseInt(quantity)
    }));
  };


  const placeOrder = async () => {
    const Items = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([menuItem, quantity]) => ({ menuItem, quantity }));

    if (Items.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    
    let totalAmount = 0;
    Items.forEach(({ menuItem, quantity }) => {
      const item = items.find(i => i._id === menuItem);
      if (item) {
        totalAmount += item.Price * quantity;
      }
    });

    try {
  
      const { data: order } = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: totalAmount
      });

     
      const options = {
        key: 'rzp_test_eWbSbu5AuEM5Ey', 
        amount: order.amount,
        currency: order.currency,
        name: 'QR Ordering System',
        description: 'Table Order Payment',
        order_id: order.id,
        handler: async function (response) {
          console.log('✅ Payment success:', response);

        
          // await axios.post('http://localhost:5000/api/order/place', {
          //   TableId:id,
          //   Items
          // });

        
          const expandedItems = Items.map(({ menuItem, quantity }) => {
            const fullItem = items.find(i => i._id === menuItem);
            return {
              name: fullItem?.ItemName || 'Unknown',
              quantity
            };
          });

          navigate('/order-success', {
            state: {
              tableId: id,
              items: expandedItems,
              estimatedTime: 1 
            }
          });
        },
        prefill: {
          name: '',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#28a745'
        },
        modal: {
          ondismiss: function () {
            alert('Payment cancelled.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error('Error placing order:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="menu-container">
       <LogoutButton />
      <h2>Our Canteen Menu</h2>
      <div className="menu-grid">
        {items.map(item => (
          <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.ItemName} />
            <h3>{item.ItemName}</h3>
            <p className="price">₹{item.Price}</p>
            <input
              type="number"
              min="0"
              placeholder="Qty"
              onChange={e => handleQuantityChange(item._id, e.target.value)}
              style={{
                marginBottom: '10px',
                width: '50%',
                border: '2px solid black'
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={placeOrder}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            position: 'fixed',
            bottom: '0',
            left: '0'
          }}
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
}

export default Menu;
