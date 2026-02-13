import React, { useEffect, useState } from 'react';

const API_BASE = "http://localhost:7071/api";

// Mock data
const MOCK_QM_DATA = [
  { host: '10.2.87.5', hostname: 'ACE-QM-01', status: 'Running' },
  { host: '10.2.87.6', hostname: 'ACE-QM-02', status: 'Running' },
  { host: '10.2.87.7', hostname: 'ACE-QM-03', status: 'Running' },
  { host: '10.2.87.8', hostname: 'ACE-QM-04', status: 'Stopped' }
];

const MOCK_CHANNEL_DATA = [
  { host: '10.2.87.5', hostname: 'ACE-QM-01', summary: 'All Running', channels: [{ status: 'RUNNING' }] },
  { host: '10.2.87.6', hostname: 'ACE-QM-02', summary: 'All Running', channels: [{ status: 'RUNNING' }] },
  { host: '10.2.87.7', hostname: 'ACE-QM-03', summary: 'Issues', channels: [{ status: 'STOPPED' }] },
  { host: '10.2.87.8', hostname: 'ACE-QM-04', summary: 'All Running', channels: [{ status: 'RUNNING' }] }
];

const MOCK_DEPTH_DATA = [
  { queue: 'PAYMENT.REQUEST.QUEUE', depth: 125 },
  { queue: 'TRANSACTION.QUEUE', depth: 45 },
  { queue: 'ERROR.QUEUE', depth: 3 },
  { queue: 'AUDIT.QUEUE', depth: 0 },
  { queue: 'NOTIFICATION.QUEUE', depth: 89 }
];

const MOCK_DISK_DATA = [
  {
    host: '10.2.87.5',
    filesystems: [
      { mount: '/opt/ibm/ace', used: '45%', 'use%': '45%' },
      { mount: '/var/log', used: '62%', 'use%': '62%' }
    ]
  },
  {
    host: '10.2.87.6',
    filesystems: [
      { mount: '/opt/ibm/ace', used: '52%', 'use%': '52%' },
      { mount: '/var/log', used: '38%', 'use%': '38%' }
    ]
  },
  {
    host: '10.2.87.7',
    filesystems: [
      { mount: '/opt/ibm/ace', used: '41%', 'use%': '41%' },
      { mount: '/var/log', used: '55%', 'use%': '55%' }
    ]
  }
];

const badge = (status) => {
  const s = status.toLowerCase();
  if (s.includes('running') || s.includes('active')) {
    return <span className="px-3 py-1 rounded-lg bg-green-500 text-white font-bold text-sm">Running</span>;
  }
  return <span className="px-3 py-1 rounded-lg bg-red-500 text-white font-bold text-sm">{status}</span>;
};

const AceDashboard = () => {
  const [qmData, setQmData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [depthData, setDepthData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    
    // Try to fetch from API, fallback to mock data
    try {
      const [qm, ch, depth, disk] = await Promise.allSettled([
        fetch(`${API_BASE}/ace-qm-status`).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(`${API_BASE}/ace-channel-status`).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(`${API_BASE}/ace-queue-depth`).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(`${API_BASE}/ace-disk-usage`).then(r => r.ok ? r.json() : Promise.reject())
      ]);

      setQmData(qm.status === 'fulfilled' && qm.value.length > 0 ? qm.value : MOCK_QM_DATA);
      setChannelData(ch.status === 'fulfilled' && ch.value.length > 0 ? ch.value : MOCK_CHANNEL_DATA);
      setDepthData(depth.status === 'fulfilled' && depth.value.length > 0 ? depth.value : MOCK_DEPTH_DATA);
      setDiskData(disk.status === 'fulfilled' && disk.value.length > 0 ? disk.value : MOCK_DISK_DATA);
    } catch (err) {
      // Use mock data on error
      setQmData(MOCK_QM_DATA);
      setChannelData(MOCK_CHANNEL_DATA);
      setDepthData(MOCK_DEPTH_DATA);
      setDiskData(MOCK_DISK_DATA);
    }
    
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Queue Manager Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Queue Manager Status</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-gray-600">Host</th>
                <th className="text-left py-2 px-4 text-gray-600">Hostname</th>
                <th className="text-left py-2 px-4 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {qmData.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.host || item.hostname || '-'}</td>
                  <td className="py-3 px-4">{item.hostname || '-'}</td>
                  <td className="py-3 px-4">{badge(item.status || item.state || 'N/A')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
        </div>

        {/* Channel Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Channel Status</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-gray-600">Host</th>
                <th className="text-left py-2 px-4 text-gray-600">Hostname</th>
                <th className="text-left py-2 px-4 text-gray-600">Summary</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((item, i) => {
                let summary = item.summary || '';
                if (!summary && Array.isArray(item.channels)) {
                  const allRunning = item.channels.every(c => (c.status || '').toUpperCase() === 'RUNNING');
                  summary = allRunning ? 'All Running' : 'Issues';
                }
                if (!summary) summary = 'N/A';
                
                return (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.host || item.hostname || '-'}</td>
                    <td className="py-3 px-4">{item.hostname || '-'}</td>
                    <td className="py-3 px-4">
                      {summary.toLowerCase().includes('all') ? 
                        <span className="px-3 py-1 rounded-lg bg-green-500 text-white font-bold text-sm">All Running</span> :
                        <span className="px-3 py-1 rounded-lg bg-red-500 text-white font-bold text-sm">Issues</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
        </div>

        {/* Queue Depth */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Queue Depth</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-gray-600">Queue</th>
                <th className="text-left py-2 px-4 text-gray-600">Depth</th>
              </tr>
            </thead>
            <tbody>
              {depthData.map((q, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{q.queue || q.name || '-'}</td>
                  <td className="py-3 px-4">{q.depth !== undefined ? q.depth : (q.count !== undefined ? q.count : '-')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
        </div>
      </div>

      {/* Right Column - Disk Usage */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Disk Usage (ACE)</h3>
          <div className="space-y-4">
            {diskData.map((srv, i) => {
              const serverName = srv.host || srv.hostname || 'server';
              const filesystems = srv.filesystems || srv.files || [];
              
              return (
                <div key={i} className="border rounded-lg p-4">
                  <div className="font-bold text-blue-600 mb-3">{serverName}</div>
                  {filesystems.length === 0 ? (
                    <p className="text-gray-500 text-sm">No filesystem data</p>
                  ) : (
                    filesystems.map((fs, j) => {
                      const mount = fs.mount || fs.filesystem || fs.path || '-';
                      const used = fs.used || fs.used_percent || fs['use%'] || '-';
                      let pctRaw = (fs['use%'] || fs.use || fs.used_percent || '').toString();
                      let n = parseInt(pctRaw.replace('%', '')) || 0;
                      const color = n >= 80 ? '#ef4444' : n >= 60 ? '#f59e0b' : '#10b981';
                      
                      return (
                        <div key={j} className="flex items-center justify-between py-2 border-b">
                          <div className="flex-1 text-gray-700 text-sm">{mount}</div>
                          <div className="w-24 text-right text-gray-700 font-semibold text-sm">{used}</div>
                          <div className="w-32 flex items-center gap-2 ml-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div style={{ width: `${n}%`, backgroundColor: color }} className="h-full rounded-full"></div>
                            </div>
                            <div className="text-xs font-bold" style={{ color }}>{pctRaw || '-'}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
          {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default AceDashboard;
