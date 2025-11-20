import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={552}
      height={552}
      viewBox="0 0 552 552"
      backgroundColor="#1C274C"
      foregroundColor="#2a80ae"
    >
      <rect x="80" y="40" rx="22" ry="22" width="400" height="400" />
      <rect x="85" y="489" rx="5" ry="5" width="250" height="30" />
      <rect x="361" y="483" rx="10" ry="10" width="40" height="40" />
      <rect x="434" y="483" rx="10" ry="10" width="40" height="40" />
    </ContentLoader>
  );
};

export default Skeleton;
