import React from "react";

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow animate-pulse">
      <div className="bg-gray-200 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
