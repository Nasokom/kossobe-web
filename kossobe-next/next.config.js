/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },

  //Header for send mail
  async headers() {
    return [
      {
        source: "/api/sendMmail",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
          { key: 'Access-Control-Allow-Headers', value: 'Accept-Encoding' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
}
module.exports = nextConfig
