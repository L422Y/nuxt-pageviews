import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit"
import defu from "defu"
import { fileURLToPath } from "node:url"

export interface ModuleOptions {
  credentialsFile?: string
  credentials?: {
    type: "service_account"
    project_id: string,
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri?: string
    token_ur?: string
    auth_provider_x509_cert_url?: string
    client_x509_cert_url: string
  }
  propertyId: string
  endpoint: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-pageviews",
    configKey: "pageViews",
  },
  defaults: {
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
