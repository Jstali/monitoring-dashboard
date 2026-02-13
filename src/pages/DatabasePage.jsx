import React from 'react';
import DashboardTitle from '../components/DashboardTitle';
import DatabaseDashboard from '../components/DatabaseDashboard';

const DatabasePage = () => {
  return (
    <div>
      <DashboardTitle 
        title="🗄️ Database Dashboard" 
        subtitle="Database monitoring and query execution" 
      />
      <DatabaseDashboard />
    </div>
  );
};

export default DatabasePage;
