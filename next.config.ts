import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Roles used to have their own pages; send old links to the careers page
  // with that role's pop-up open.
  async redirects() {
    return [
      {
        // Lowercase words and dashes only, so files can never match.
        source: "/careers/:slug([a-z0-9-]+)",
        destination: "/careers?role=:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
