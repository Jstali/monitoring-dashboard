import React from 'react';

const quickAccessData = [
  { title: 'ACE Dashboard', description: 'Monitor ACE integration flows' },
  { title: 'WAS Dashboard', description: 'WebSphere application server status' },
  { title: 'Health Checks', description: 'System health monitoring' },
  { title: 'IMIB Health Check', description: 'IMIB platform health status' },
  { title: 'Database Dashboard', description: 'Database performance metrics' },
  { title: 'Putty Servers', description: 'Server connection management' },
  { title: 'HUB01 Dashboard', description: 'HUB01 monitoring and metrics' },
  { title: 'HUB03 Dashboard', description: 'HUB03 monitoring and metrics' },
  { title: 'ACE Frontends', description: 'Frontend application status' },
  { title: 'Health Excel Reports', description: 'Download health reports' }
];

const QuickAccessCards = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickAccessData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            style={{ borderLeft: '4px solid #8DE971' }}
          >
            <h3 className="font-semibold mb-2" style={{ color: '#030304' }}>{card.title}</h3>
            <p className="text-sm" style={{ color: '#030304', opacity: 0.7 }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;
