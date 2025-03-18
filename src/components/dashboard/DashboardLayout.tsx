import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard/products">Products</a></li>
            <li><a href="/dashboard/special-offers">Special Offers</a></li>
            <li><a href="/dashboard/users">Users</a></li>
            <li><a href="/dashboard/orders">Orders</a></li>
          </ul>
        </nav>
      </div>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 