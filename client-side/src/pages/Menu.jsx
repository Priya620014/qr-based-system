import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/logout';

function Menu() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [authChecked, setAuthChecked] = useState(false);
  const [search, setSearch] = useState('');
  const [tableNo, setTableNo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/current_user`, { withCredentials: true })
      .then(res => {
        if (res.data && res.data.user) setAuthChecked(true);
        else {
          localStorage.setItem('id', id);
          window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
        }
      })
      .catch(() => {
        localStorage.setItem('id', id);
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
      });
  }, [id]);

  useEffect(() => {
    if (!authChecked) return;
    axios.get(`${process.env.REACT_APP_API_URL}/api/menus`)
      .then(res => setItems(res.data))
      .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_API_URL}/api/tables/${id}`)
      .then(res => setTableNo(res.data.TableNo))
      .catch(err => console.log(err));
  }, [authChecked]);

  const updateQty = (itemId, delta) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const totalItems = Object.values(selectedItems).reduce((a, b) => a + b, 0);
  const totalAmount = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const item = items.find(i => i._id === id);
    return sum + (item ? item.Price * qty : 0);
  }, 0);

  const placeOrder = async () => {
    const Items = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([menuItem, quantity]) => ({ menuItem, quantity }));

    if (Items.length === 0) { alert('Please select at least one item.'); return; }

    try {
      const { data: order } = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-order`, { amount: totalAmount });

      const options = {
        key: 'rzp_test_eWbSbu5AuEM5Ey',
        amount: order.amount,
        currency: order.currency,
        name: 'QR Ordering System',
        description: 'Table Order Payment',
        order_id: order.id,
        handler: async function (response) {
          console.log('✅ Payment success:', response);
          const expandedItems = Items.map(({ menuItem, quantity }) => {
            const fullItem = items.find(i => i._id === menuItem);
            return { name: fullItem?.ItemName || 'Unknown', quantity };
          });
          const totalQty = expandedItems.reduce((sum, i) => sum + i.quantity, 0);
          const estimatedTime = Math.max(5, totalQty * 2);
          let resolvedTableNo = tableNo;
          if (!resolvedTableNo) {
            try {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tables/${id}`);
              resolvedTableNo = res.data.TableNo;
            } catch (e) { resolvedTableNo = 'N/A'; }
          }
          navigate('/order-success', { state: { tableNo: resolvedTableNo, items: expandedItems, estimatedTime } });
        },
        prefill: { name: '', email: 'test@example.com', contact: '9999999999' },
        theme: { color: '#f97316' },
        modal: { ondismiss: () => alert('Payment cancelled.') }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  if (!authChecked) return (
    <div className="menu-loading">
      <div className="spinner" />
      <p>Checking authentication...</p>
    </div>
  );

  const filtered = items.filter(i => i.ItemName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>🍽️ <span>Canteen</span> Menu</h2>
        <div className="header-right">
          {tableNo && <span className="table-badge">Table {tableNo}</span>}
          <LogoutButton />
        </div>
      </div>

      <div className="menu-search-bar">
        <input
          type="text"
          placeholder="🔍  Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No items found.</p>
      ) : (
        <div className="menu-grid">
          {filtered.map(item => (
            <div key={item._id} className="menu-card">
              {!item.Available && <span className="unavailable-badge">Unavailable</span>}
              <img src={item.image} alt={item.ItemName} />
              <div className="menu-card-body">
                <h3>{item.ItemName}</h3>
                <p className="price">₹{item.Price}</p>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item._id, -1)} disabled={!selectedItems[item._id]}>−</button>
                  <span className="qty-display">{selectedItems[item._id] || 0}</span>
                  <button className="qty-btn" onClick={() => updateQty(item._id, 1)} disabled={!item.Available}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="cart-bar">
          <div className="cart-bar-info">
            <div className="cart-count">{totalItems} item{totalItems > 1 ? 's' : ''} selected</div>
            <div className="cart-total">₹{totalAmount}</div>
          </div>
          <button className="cart-bar-btn" onClick={placeOrder}>Pay & Place Order →</button>
        </div>
      )}
    </div>
  );
}

export default Menu;
