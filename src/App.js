import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardTitle from './components/DashboardTitle';
import QuickAccessCards from './components/QuickAccessCards';
import LiveQueueStatus from './components/LiveQueueStatus';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F2F4' }}>
      <Header />
      <Sidebar />
      <main className="ml-64 p-8">
        <DashboardTitle />
        <QuickAccessCards />
        <LiveQueueStatus />
      </main>
    </div>
  );
}

export default App;
