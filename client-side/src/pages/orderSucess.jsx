import React, { useEffect, useState } from 'react';
import './orderSucces.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../components/logout';

function OrderSuccess() {
  const location = useLocation();
  const { tableId, items, estimatedTime = 15 } = location.state || {};

  const [expandedItems, setExpandedItems] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);


  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const responses = await Promise.all(
          items.map(item =>
            axios.get(`http://localhost:5000/api/menus/${item.menuItem}`)
          )
        );

        const enrichedItems = responses.map((res, index) => ({
          name: res.data.ItemName,
          quantity: items[index].quantity,
        }));

        setExpandedItems(enrichedItems);
      } catch (error) {
        console.error("Failed to fetch menu item names", error);
      }
    };

    if (items && items.length > 0 && items[0].menuItem) {
      fetchItemDetails();
    } else {
      setExpandedItems(items); 
    }
  }, [items]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  const percentComplete = Math.min((secondsElapsed / (estimatedTime * 60)) * 100, 100);
  const isDelivered = percentComplete >= 100;

  return (
    
    <div className="order-success-container">
      <LogoutButton />
      <h1>🎉 Order Placed Successfully!</h1>
      <p className="thank-you">Thank you for ordering from our canteen.</p>

      <div className="summary-box">
        <h2>📋 Order Summary</h2>
        <p><strong>Table:</strong> {tableId || 'N/A'}</p>
        <ul>
          {expandedItems.map((item, index) => (
            <li key={index}>
              {item.name} : <strong>{item.quantity}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="timer-box">
        <h2>⏱️ Delivery Timer</h2>
        <p><strong>Time Elapsed:</strong> {minutes}m {seconds}s</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentComplete}%` }} />
        </div>
        {isDelivered ? (
          <p className="delivered-msg">✅ Delivered!</p>
        ) : (
          <p>Estimated Time: ~{estimatedTime} minutes</p>
        )}
         
      </div>
    </div>
  );
}

export default OrderSuccess;
