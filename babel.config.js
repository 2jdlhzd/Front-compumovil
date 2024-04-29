<<<<<<< HEAD
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@controllers': './src/controllers',
          '@routes': './src/routes',
          '@models': './src/models',
          '@services': './src/services',
          '@config': './src/config',
          '@middlewares': './src/middlewares',
          '@utils': './src/utils',
          '@seeders': './src/seeders'
        }
      }
    ]
  ]
=======
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
>>>>>>> 4b9cdc246c0339ae80be37f6e1a16d81901b71e6
};
