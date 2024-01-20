// Planner.tsx

import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const PlannerPage: React.FC = () => {
  return (
    <div>
      <Navbar path="planner"/>
      <div className="content">
        <h1>Welcome to the Planner Page!</h1>
        <p>This is the content of your planning page.</p>
      </div>
    </div>
  );
};

export default PlannerPage;
