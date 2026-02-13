import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AcePage from './pages/AcePage';
import WasPage from './pages/WasPage';
import HealthChecksPage from './pages/HealthChecksPage';
import ECatPage from './pages/ECatPage';
import DatabasePage from './pages/DatabasePage';
import CommandExecutorPage from './pages/CommandExecutorPage';
import Hub01Page from './pages/Hub01Page';
import Hub03Page from './pages/Hub03Page';
import AceFrontendsPage from './pages/AceFrontendsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#F6F2F4' }}>
        <Header />
        <Sidebar />
        <main className="ml-52 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ace" element={<AcePage />} />
            <Route path="/was" element={<WasPage />} />
            <Route path="/health-checks" element={<HealthChecksPage />} />
            <Route path="/ecat" element={<ECatPage />} />
            <Route path="/database" element={<DatabasePage />} />
            <Route path="/command-executor" element={<CommandExecutorPage />} />
            <Route path="/hub01" element={<Hub01Page />} />
            <Route path="/hub03" element={<Hub03Page />} />
            <Route path="/ace-frontends" element={<AceFrontendsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
