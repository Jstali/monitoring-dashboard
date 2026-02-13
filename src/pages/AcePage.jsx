import React from 'react';
import DashboardTitle from '../components/DashboardTitle';
import AceDashboard from '../components/AceDashboard';

const AcePage = () => {
  return (
    <div>
      <DashboardTitle 
        title="🔷 ACE Dashboard" 
        subtitle="App Connect Enterprise monitoring" 
      />
      <AceDashboard />
    </div>
  );
};

export default AcePage;
