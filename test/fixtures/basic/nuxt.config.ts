import NuxtModule from "../../../src/module"
import { createResolver } from "@nuxt/kit"

export default defineNuxtConfig({
  modules: [
    NuxtModule
  ],
  runtimeConfig: {
    public: {
      pageViewsEndpoint: "/api/hit"
    },
    pageViews: {
      credentialsFile: "./playground/src/google-service-account.json",
      propertyId: "331054024"
    }
  },
  alias: {
    "@": createResolver(import.meta.url).resolve('../../../'),
  }
})
