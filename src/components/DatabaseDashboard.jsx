import React, { useState, useEffect } from 'react';

const MOCK_TABLES = [
  { name: 'users', rows: 15420, size: '2.4 MB' },
  { name: 'orders', rows: 48392, size: '8.1 MB' },
  { name: 'products', rows: 3241, size: '1.2 MB' },
  { name: 'transactions', rows: 92847, size: '15.6 MB' },
  { name: 'audit_logs', rows: 234891, size: '42.3 MB' }
];

const MOCK_CONNECTIONS = [
  { id: 1, user: 'app_user', database: 'production_db', state: 'active', duration: '00:15:32' },
  { id: 2, user: 'readonly_user', database: 'production_db', state: 'idle', duration: '01:23:45' },
  { id: 3, user: 'admin', database: 'production_db', state: 'active', duration: '00:02:18' },
  { id: 4, user: 'app_user', database: 'production_db', state: 'active', duration: '00:45:12' }
];

const DatabaseDashboard = () => {
  const [host, setHost] = useState('Loading...');
  const [database, setDatabase] = useState('Loading...');
  const [status, setStatus] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbSize, setDbSize] = useState('69.6 MB');
  const [activeConnections, setActiveConnections] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      setHost('db-server-01.nxzen.local');
      setDatabase('production_db');
      setStatus('Connected');
      setLoading(false);
    }, 1000);
  }, []);

  const handleRunQuery = () => {
    if (!sqlQuery.trim()) return;
    
    setQueryResult({
      success: true,
      message: 'Query executed successfully',
      rows: Math.floor(Math.random() * 100)
    });
  };

  return (
    <div className="space-y-6">
      {/* Database Connectivity Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: '#3B82F6' }}>Database Connectivity</h2>
            <p className="text-gray-500 text-sm">Live connection status and metadata</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Host</span>
            <span className="text-gray-800">{host}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Database</span>
            <span className="text-gray-800">{database}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Status</span>
            <div className="flex items-center gap-2">
              {!loading && status === 'Connected' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-semibold">{status}</span>
                </>
              )}
              {loading && <span className="text-gray-400">Connecting...</span>}
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Database Size</span>
            <span className="text-gray-800">{dbSize}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600 font-medium">Active Connections</span>
            <span className="text-gray-800 font-semibold">{activeConnections}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Tables Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Database Tables</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-gray-600">Table</th>
                <th className="text-left py-2 px-4 text-gray-600">Rows</th>
                <th className="text-left py-2 px-4 text-gray-600">Size</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TABLES.map((table, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{table.name}</td>
                  <td className="py-3 px-4 text-gray-600">{table.rows.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{table.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Connections */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Active Connections</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-gray-600">User</th>
                <th className="text-left py-2 px-4 text-gray-600">State</th>
                <th className="text-left py-2 px-4 text-gray-600">Duration</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CONNECTIONS.map((conn) => (
                <tr key={conn.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{conn.user}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      conn.state === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {conn.state}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{conn.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run SQL Query Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Run SQL Query</h3>
        
        <textarea
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          placeholder="Enter SQL query..."
          className="w-full h-32 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ 
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0',
            border: 'none'
          }}
        />
        
        <button
          onClick={handleRunQuery}
          disabled={!sqlQuery.trim()}
          className="mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#3B82F6' }}
        >
          Run Query
        </button>

        {queryResult && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-700 font-medium">{queryResult.message}</p>
            <p className="text-green-600 text-sm mt-1">{queryResult.rows} rows affected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseDashboard;
