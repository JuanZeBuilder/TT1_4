// HomePage.tsx

import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Welcome to the Home Page!</h1>
        <p>This is the content of your home page.</p>
      </div>
    </div>
  );
};

export default HomePage;
