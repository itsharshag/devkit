const withPWA = require('next-pwa');

module.exports =
// withPWA(
{
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.DefinePlugin({
      IN_BROWSER: true,
    }))
    return config;
  },
  publicRuntimeConfig: {
    ANNUAL_SUBSCRIPTION_RAZORPAY_LINK: process.env.ANNUAL_SUBSCRIPTION_RAZORPAY_LINK
  }
}
// )