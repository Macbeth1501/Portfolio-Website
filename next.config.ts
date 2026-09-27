import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false,
  images: {
    // Uploaded project/hero images live in the Supabase "media" bucket
    // (see supabase/schema.sql); every Supabase project serves storage
    // from a *.supabase.co subdomain.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
