import axiosInstance from '@/utils/api/axiosInstance';
import React, { useState, useEffect } from 'react';

// Add pulse animation
const pulseAnimation = `
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
`;

// Add style tag to head
const style = document.createElement('style');
style.textContent = pulseAnimation;
document.head.appendChild(style);

const TopCardBlock = () => {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    totalApplied: 0,
    totalShortlisted: 0,
    totalAlerts: 0,
    totalProfileViews: 0,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axiosInstance('/dashboard/candidate-summary');

        if (response?.data?.success) {
          setSummaryData(response.data.summaryData);
        }
      } catch (error) {
        console.error('Error fetching summary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: summaryData.totalApplied,
      metaName: "Applied Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: summaryData.totalAlerts,
      metaName: "Job Alerts",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: summaryData.totalProfileViews,
      metaName: "Profile Views",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: summaryData.totalShortlisted,
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {loading ? (
        // Loading skeleton
        <>
          {[1, 2, 3, 4].map((index) => (
            <div
              className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
              key={index}
            >
              <div className="ui-item" style={{ background: '#f3f3f3' }}>
                <div className="left">
                  <div className="skeleton-loading" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#e0e0e0',
                    animation: 'pulse 1.5s infinite'
                  }}></div>
                </div>
                <div className="right">
                  <div className="skeleton-loading" style={{
                    width: '60px',
                    height: '24px',
                    background: '#e0e0e0',
                    marginBottom: '8px',
                    animation: 'pulse 1.5s infinite'
                  }}></div>
                  <div className="skeleton-loading" style={{
                    width: '80px',
                    height: '16px',
                    background: '#e0e0e0',
                    animation: 'pulse 1.5s infinite'
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        // Actual content
        cardContent.map((item) => (
          <div
            className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={item.id}
          >
            <div className={`ui-item ${item.uiClass}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.countNumber}</h4>
                <p>{item.metaName}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TopCardBlock;
