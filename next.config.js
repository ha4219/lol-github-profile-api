/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src lol-github-profile-api.vercel.app;
  style-src 'self' lol-github-profile-api.vercel.app;
  img-src 'self' lol-github-profile-api.vercel.app
  font-src 'self';  
`;

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['lol-github-profile-api.vercel.app'],
//   },
// };

module.exports = {
  async headers() {
    return [
      {
        source: '/assets',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
