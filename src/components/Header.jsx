import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#8DE971' }}>
      <div className="flex items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <img src="/download 1.jpg" alt="nxzen logo" className="h-12" />
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#030304' }}>nxzen</h1>
            <p className="text-sm" style={{ color: '#030304', opacity: 0.8 }}>Helping national infrastructure providers prepare for the future</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
