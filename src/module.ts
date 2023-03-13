import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit"
import defu from "defu"
import { fileURLToPath } from "node:url"


export type ViewsCache = { [key: string]: number }

export enum PageViewsProvider {
  GoogleAnalytics = "googleAnalytics"
}

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
  endpoint?: string
  /**
   * Get views for exact URLs, do not merge views for URLs that may or may not have a trailing slash
   */
  exact?: boolean
  startDate?: string
  debug?: boolean
  preload?: boolean
  provider: PageViewsProvider
  cacheTimeout?: number
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-pageviews",
    configKey: "pageViews",
  },
  defaults: {
    propertyId: "5555555",
    endpoint: "/api/views",
    exact: false,
    preload: true,
    startDate: "2018-01-01",
    provider: PageViewsProvider.GoogleAnalytics,
    cacheTimeout: 60 * 30
  } as ModuleOptions,
  setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url))

    nuxt.options.runtimeConfig.pageViews = defu(nuxt.options.runtimeConfig.pageViews, options)
    nuxt.options.runtimeConfig.public.pageViews = {endpoint: options.endpoint, exact: options.exact}
    nuxt.options.build.transpile.push(runtimeDir)

    const endpoint = options.endpoint

    if (!endpoint) {
      console.warn("You must set a pageViews.endpoint in runtimeConfig.public!")
    }

    const pluginPath = resolve("./runtime/plugin")
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
