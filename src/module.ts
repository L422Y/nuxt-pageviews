import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit"
import defu from "defu"
import { fileURLToPath } from "node:url"

export interface ModuleOptions {
  credentialsFile: string
  propertyId: string
  endpoint: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-pageviews",
    configKey: "pageViews",
  },
  defaults: {
    credentialsFile: "./src/google-service-account.json",
    propertyId: "5555555",
    endpoint: "/api/views"
  } as ModuleOptions,
  setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url))
    const pluginPath = resolve("./runtime/plugin")

    nuxt.options.runtimeConfig.pageViews = defu(nuxt.options.runtimeConfig.pageViews, options)
    nuxt.options.runtimeConfig.public.pageViewsEndpoint = options.endpoint
    nuxt.options.build.transpile.push(runtimeDir)

    const endpoint = options.endpoint

    if (!endpoint) {
      console.warn("You must set a pageViewsEndpoint in runtimeConfig.public!")
    }

    addPlugin(pluginPath)

    addServerHandler({
      route: endpoint,
      method: "get",
      handler: resolve(runtimeDir, "server/api/views.get")
    })

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"))
    })

    nuxt.hook("prepare:types", (options) => {
      options.references.push({path: resolve(nuxt.options.buildDir, "types/pageviews.d.ts")})
    })
  }
})
