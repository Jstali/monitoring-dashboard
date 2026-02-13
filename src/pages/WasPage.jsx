import React from 'react';
import DashboardTitle from '../components/DashboardTitle';
import WasDashboard from '../components/WasDashboard';

const WasPage = () => {
  return (
    <div>
      <DashboardTitle 
        title="🌐 WAS Dashboard" 
        subtitle="WebSphere Application Server monitoring" 
      />
      <WasDashboard showOnlyTwoDisks={true} />
    </div>
  );
};

export default WasPage;
