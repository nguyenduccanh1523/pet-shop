import React from "react";

const LoadingSpinner = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
