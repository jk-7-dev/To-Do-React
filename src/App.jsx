import React from 'react';
import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div className="main-app-wrapper">
    
      <Outlet />
      
    </div>
  );
}

export default App;