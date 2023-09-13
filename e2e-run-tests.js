const cypress = require('cypress')

cypress.run({
  reporter: 'junit',
  config: {
    baseUrl: 'http://localhost:3000'
  },
  env: {
    login_url: '/login'
  },
})