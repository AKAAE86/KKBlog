const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // 修改 markdown 文件加载器配置
  config.module.rules.push({
    test: /\.md$/,
    type: 'asset/source',
    generator: {
      filename: 'static/media/[name].[hash][ext]'
    }
  });

  // 添加 buffer polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // 添加 fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/')
  };

  return config;
} 