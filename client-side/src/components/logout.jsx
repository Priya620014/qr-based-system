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
        backgroundColor: 'orange',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin:'0px 1100px'
        
        
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
