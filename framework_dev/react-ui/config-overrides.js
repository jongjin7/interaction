const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pattern': path.resolve(__dirname, 'src/patterns/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
    },
  };
  return config;
};
