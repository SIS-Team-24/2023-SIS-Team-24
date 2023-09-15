// {
//     "baseUrl": "http://localhost:3000",
//     "viewportWidth": 1300,
//     "viewportHeight": 800
// }

const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
      baseUrl: 'http://localhost:3000',
      supportFile: false,
    },
  })