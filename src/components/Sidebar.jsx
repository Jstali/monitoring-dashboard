import React, { useState } from 'react';

const menuItems = [
  'Home',
  'ACE Dashboard',
  'WAS Dashboard',
  'Health Checks',
  'E-Cat | HSBC',
  'Database',
  'Command Executor',
  'HUB01',
  'HUB03',
  'ACE Frontends',
  'Reports'
];

const Sidebar = () => {
  const [active, setActive] = useState('Home');

  return (
    <aside className="w-64 h-screen fixed left-0 top-[88px]" style={{ backgroundColor: '#030304' }}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6" style={{ color: '#8DE971' }}>Control Center</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                active === item
                  ? 'font-semibold'
                  : 'hover:bg-opacity-10'
              }`}
              style={
                active === item
                  ? { backgroundColor: '#F6F2F4', color: '#030304' }
                  : { color: '#F6F2F4', backgroundColor: 'transparent' }
              }
              onMouseEnter={(e) => {
                if (active !== item) {
                  e.currentTarget.style.backgroundColor = 'rgba(141, 233, 113, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== item) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
