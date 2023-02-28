import NuxtPageViews from "../src/module"
export default defineNuxtConfig({
  modules: [
    NuxtPageViews
  ],
  runtimeConfig: {
    pageViews: {
      credentialsFile: "./playground/src/google-service-account.json",
      propertyId: "331054024",
      endpoint: "/api/views"
    },
    public: {
    },

  }
})


