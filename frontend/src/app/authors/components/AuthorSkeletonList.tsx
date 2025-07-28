import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuthorSkeletonList() {
  return (
    <div className="d-flex flex-column gap-3">
      {[...Array<undefined>(4)].map((_, idx) => (
        <div 
          key={idx}
          className="p-4 rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-white shadow-sm skeleton-card"
        >
          <div className="mb-3 mb-md-0">
            <div className="rounded mb-2 bg-primary bg-opacity-25 skeleton-name" style={{ height: '20px', width: '160px' }}></div>
            <div className="rounded bg-secondary bg-opacity-25 skeleton-birthdate" style={{ height: '12px', width: '120px' }}></div>
          </div>
          <div className="d-flex gap-2">
            <div className="rounded bg-primary bg-opacity-25 skeleton-edit" style={{ height: '32px', width: '96px' }}></div>
            <div className="rounded bg-danger bg-opacity-25 skeleton-delete" style={{ height: '32px', width: '80px' }}></div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .skeleton-card {
          animation: pulse 1.5s infinite ease-in-out;
        }
        
        @keyframes pulse {
          40%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}