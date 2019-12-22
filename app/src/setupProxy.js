const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:5001/zenyatta-app/us-central1",
      pathRewrite: {
        "^/api": ""
      },
      changeOrigin: true
    })
  );
};
