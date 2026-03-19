import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    const tableId = localStorage.getItem('id'); 
    if (!tableId) {
      alert("Table ID not found!");
      return;
    }
   
    window.location.href = `http://localhost:5000/auth/logout/${tableId}`;
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{
        backgroundColor: 'transparent',
        color: 'white',
        padding: '7px 16px',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '13px',
        whiteSpace: 'nowrap'
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
