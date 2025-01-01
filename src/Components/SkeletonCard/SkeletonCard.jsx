import React from "react";
import "../CSS/SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-description"></div>
      <div className="skeleton-text skeleton-tag"></div>
    </div>
  );
};

export default SkeletonCard;
