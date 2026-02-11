import React from 'react';

const queueManagers = Array(6).fill({
  title: 'Loading...',
  status: 'Checking',
  ip: '--',
  queueManager: '--'
});

const LiveQueueStatus = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#030304' }}>Live Queue Manager Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queueManagers.map((queue, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            style={{ borderLeft: '4px solid #A855F7' }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold" style={{ color: '#030304' }}>{queue.title}</h3>
              <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}>
                {queue.status}
              </span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: '#030304', opacity: 0.7 }}>
              <p><span className="font-medium">IP:</span> {queue.ip}</p>
              <p><span className="font-medium">Queue Manager:</span> {queue.queueManager}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveQueueStatus;
