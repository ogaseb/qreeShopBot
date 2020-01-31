module.exports = {
  apps: [
    {
      name: "qreeShopBot",
      script: "./server.js",
      instances: "1",
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
