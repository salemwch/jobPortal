import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import dashboard from '../services/dashboard';
import '../App.css'; // Make sure CSS is included

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalCondidates: 0,
    totalJobOffers: 0,
    totalPendingJobOffers: 0,
    totalApprovedJobOffers: 0,
    totalRejectedJobOffers: 0,
    totalJobApplications: 0,
    totalPendingJobApplications: 0,
    totalApprovedJobApplications: 0,
    totalRejectedJobApplications: 0,
  });

  useEffect(() => {
    dashboard.getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.log("Error fetching dashboard stats:", err));
  }, []);

  const categories = [
    'Users', 'Companies', 'Candidates', 'Job Offers', 
    'Pending Job Offers', 'Approved Job Offers', 'Rejected Job Offers',
    'Job Applications', 'Pending Job Applications', 'Approved Job Applications', 'Rejected Job Applications'
  ];

  const colors = ['#1E88E5', '#D32F2F', '#43A047', '#FB8C00', '#FB8C99', '#000000', '#F4511E', '#00ACC1', '#546E7A', '#C0CA33', '#5E35B1'];

  // Convert each stat into its own dataset to apply unique colors
  const chartSeries = categories.map((category, index) => ({
    name: category,
    data: [Object.values(stats)[index]], // Extract value dynamically
  }));

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false, // Keep vertical bars
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Statistics'], // Just a placeholder
    },
    colors: colors, // Assign different colors
    legend: {
      show: false, // Hide default legend
    },
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Admin Dashboard</h1>

      {/* Custom Legend */}
      <div className="chart-legend">
        {categories.map((category, index) => (
          <div key={index} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: colors[index] }}></span>
            {category}
          </div>
        ))}
      </div>

      <div className="card shadow p-4">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={400} />
      </div>
    </div>
  );
};

export default Dashboard;
