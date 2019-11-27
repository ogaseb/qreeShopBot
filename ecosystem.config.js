module.exports = {
  apps: [
    {
      name: "qreeShopBot",
      script: "./server.js",
      instances: "1",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
