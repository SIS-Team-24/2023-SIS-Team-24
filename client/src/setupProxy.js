const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({ path: "../.env" });

module.exports = function (app) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  console.log(
    "[client]: Environment is:",
    process.env.REACT_ENV ? process.env.REACT_ENV : "development"
  );
  const target =
    process.env.REACT_ENV == "production"
      ? "https://goat-thankful-iguana.ngrok-free.app" // Your production backend URL (currently not used)
      : `http://127.0.0.1:${port}`; // Your default development backend URL

  console.log("[client]: Backend API @", target);
  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
