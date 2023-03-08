import NuxtModule from "../../../src/module"
import { createResolver } from "@nuxt/kit"

export default defineNuxtConfig({
  modules: [
    NuxtModule
  ],
  runtimeConfig: {
    public: {
      pageViews: {
        endpoint: "/api/hit",
        exact: false
      }
    },
    pageViews: {
      credentialsFile: "./playground/src/google-service-account.json",
      propertyId: "331054024"
    }
  },
  alias: {
    "@": createResolver(import.meta.url).resolve("../../../"),
  }
})
