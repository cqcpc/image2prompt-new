import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  routeRules: {
    '/**': { cors: true }
  },
  typescript: {
    strict: true
  }
})