const LoadingSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md animate-pulse"
    >
      <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
      <div className="h-12 bg-gray-200 rounded mb-6"></div>

      <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
      <div className="h-12 bg-gray-200 rounded mb-6"></div>

      <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
      <div className="h-12 bg-gray-200 rounded mb-6"></div>

      <div className="h-10 bg-gray-200 rounded w-24  mb-6"></div>

      <div className="h-4 bg-gray-200 rounded w-40"></div>
    </div>
  );
};

export default LoadingSkeleton;
