import React from 'react';
import DashboardTitle from '../components/DashboardTitle';
import QuickAccessCards from '../components/QuickAccessCards';
import LiveQueueStatus from '../components/LiveQueueStatus';

const Home = () => {
  return (
    <div>
      <DashboardTitle 
        title="🏠 Home Dashboard" 
        subtitle="Quick access to all monitoring tools" 
      />
      <QuickAccessCards />
      <LiveQueueStatus />
    </div>
  );
};

export default Home;
