import React, { useEffect, useState } from 'react';
import './orderSucces.css';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../components/logout';

function OrderSuccess() {
  const location = useLocation();
  const { tableNo, items = [], estimatedTime = 10 } = location.state || {};

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const totalSeconds = estimatedTime * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => {
        if (prev >= totalSeconds) { clearInterval(interval); return totalSeconds; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);

  const percent = Math.min((secondsElapsed / totalSeconds) * 100, 100);
  const isCompleted = percent >= 100;

  const remaining = totalSeconds - secondsElapsed;
  const remMin = Math.floor(remaining / 60);
  const remSec = remaining % 60;

  // steps: 0=confirmed, 1=preparing, 2=ready
  const currentStep = percent < 30 ? 0 : percent < 80 ? 1 : isCompleted ? 2 : 1;

  const steps = [
    { icon: '✅', label: 'Confirmed' },
    { icon: '👨‍🍳', label: 'Preparing' },
    { icon: '🍽️', label: 'Ready!' },
  ];

  return (
    <div className="order-success-container">

      <div className="order-header">
        <h2>🍽️ <span>Zykaa</span> Canteen</h2>
        <LogoutButton />
      </div>

      <div className="success-icon">{isCompleted ? '🎊' : '🎉'}</div>
      <h1 className="success-title">
        {isCompleted ? 'Order is ' : 'Order '}
        <span>{isCompleted ? 'Ready!' : 'Placed!'}</span>
      </h1>
      <p className="success-sub">
        {isCompleted ? 'Your food is ready. Enjoy your meal!' : 'Sit back and relax, your food is being prepared.'}
      </p>

      <div className="cards-wrapper">

        {/* Table */}
        <div className="info-card">
          <h3>📍 Table Info</h3>
          <span className="table-badge">Table {tableNo || 'N/A'}</span>
        </div>

        {/* Order Summary */}
        <div className="info-card">
          <h3>📋 Order Summary</h3>
          {items.map((item, i) => (
            <div key={i} className="order-item-row">
              <span>{item.name}</span>
              <span className="qty-badge">x{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Timer */}
        <div className="info-card">
          <h3>⏱️ Delivery Timer</h3>

          {isCompleted ? (
            <div className="completed-banner">
              <div className="check">✅</div>
              <h3>Order Completed!</h3>
              <p>Your food has been delivered. Enjoy!</p>
            </div>
          ) : (
            <>
              <div className="timer-display">
                <div className="time-text">
                  {String(remMin).padStart(2, '0')}:{String(remSec).padStart(2, '0')}
                </div>
                <div className="time-label">estimated time remaining</div>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <p className="eta-text">~{estimatedTime} min total · {Math.round(percent)}% done</p>
            </>
          )}

          {/* Steps */}
          <div className="steps-row" style={{ marginTop: '16px' }}>
            {steps.map((s, i) => (
              <div key={i} className={`step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
                <span className="step-icon">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
