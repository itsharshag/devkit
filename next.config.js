module.exports =
{
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.DefinePlugin({
      IN_BROWSER: true,
    }))
    return config;
  }
}