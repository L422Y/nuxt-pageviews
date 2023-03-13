import NuxtPageViews from "../src/module"

export default defineNuxtConfig({
  modules: [
    NuxtPageViews
  ],
  runtimeConfig: {
    pageViews: {
      credentialsFile: "./playground/src/google-service-account.json",
      propertyId: "331054024",
      endpoint: "/api/views",
      startDate: "2021-01-01",
      cacheTimeout: 15 * 60,
      debug: false
    },
    public: {},
  }
})


