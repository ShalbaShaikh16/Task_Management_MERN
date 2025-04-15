import React from 'react';
import Sidebar from './Home/Sidebar';  // Sidebar component
import ErrorBoundary from './ErrorBoundry'; // ErrorBoundary component

// Wrap Sidebar with ErrorBoundary
const SidebarWithErrorBoundary = () => (
  <ErrorBoundary>
    <Sidebar />
  </ErrorBoundary>
);

export default SidebarWithErrorBoundary;
