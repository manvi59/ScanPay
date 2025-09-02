 

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: 'export',    
//   images: {
//     unoptimized: true,  
//   },
//   eslint: {
//     ignoreDuringBuilds: true,  
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/design",
        permanent: false, // set to true if you want 301 permanent redirect
      },
    ];
  },
};

export default nextConfig;
