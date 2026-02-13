import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'ACE Dashboard', path: '/ace' },
  { name: 'WAS Dashboard', path: '/was' },
  { name: 'Health Checks', path: '/health-checks' },
  { name: 'E-Cat | HSBC', path: '/ecat' },
  { name: 'Database', path: '/database' },
  { name: 'Command Executor', path: '/command-executor' },
  { name: 'HUB01', path: '/hub01' },
  { name: 'HUB03', path: '/hub03' },
  { name: 'ACE Frontends', path: '/ace-frontends' },
  { name: 'Reports', path: '/reports' }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-52 h-screen fixed left-0 top-[88px]" style={{ backgroundColor: '#030304' }}>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#8DE971' }}>Control Center</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-all no-underline text-sm ${
                  isActive ? 'font-semibold' : ''
                }`}
                style={{
                  textDecoration: 'none',
                  ...(isActive
                    ? { backgroundColor: '#F6F2F4', color: '#030304' }
                    : { color: '#F6F2F4', backgroundColor: 'transparent' })
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(141, 233, 113, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
