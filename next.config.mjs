/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_SUPABASE_URL 
            ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
            : 'jogsnblhmpyvijypawsy.supabase.co', // Fallback to your specific Supabase domain
        },
      ],
    },
  };
  
  export default nextConfig;