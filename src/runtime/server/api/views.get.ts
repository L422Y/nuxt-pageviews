import { appendHeader, defineEventHandler, defineLazyEventHandler, getQuery, } from "h3"
import { QueryObject } from "ufo"
import { useRuntimeConfig } from "#imports"
import { googleAnalytics } from "../../adapters/GoogleAnalytics"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import { ViewsCache } from "../../../module"


export default defineLazyEventHandler(async () => {
  const config = await useRuntimeConfig()
  const storage = await createStorage({driver: memoryDriver()})

  await storage.setItem("cache:pageViewsCacheRefresh", false)
  await storage.setItem("cache:pageViewsCacheProcessing", false)

  const providers = {
    "googleAnalytics": googleAnalytics
  }
  const provider = config.pageViews.provider

  const refreshAnalyticsCache = async () => {
    let analyticsCache: ViewsCache = <ViewsCache>( await storage.getItemRaw("cache:pageViews") )
    const analyticsCacheProcessing = ( await storage.getItem("cache:pageViewsCacheProcessing") ) as boolean
    const analyticsCacheRefresh = ( await storage.getItem("cache:pageViewsCacheRefresh") ) as boolean
    const shouldRefresh = !analyticsCacheProcessing && ( analyticsCache === null || analyticsCacheRefresh )
    if (shouldRefresh) {
      const providerFunction = providers[provider]
      await storage.setItem("cache:pageViewsCacheRefresh", false)
      await storage.setItem("cache:pageViewsCacheProcessing", true)

      if (analyticsCache === null) {
        // Wait for data
        analyticsCache = await providerFunction(config, storage)
        await storage.setItemRaw("cache:pageViews", analyticsCache)
        await storage.setItem("cache:pageViewsCacheProcessing", false)

      } else {
        // Send stale data and refresh in the background
        providerFunction(config, storage).then(async (analyticsCache) => {
          await storage.setItemRaw("cache:pageViews", analyticsCache)
          await storage.setItem("cache:pageViewsCacheRefresh", false)
        })
      }
      if (process.env?.npm_lifecycle_event !== "generate") {
        setTimeout(async () => {
          if (config.pageViews.debug) console.log("pageViews:timeout:needRefresh")
          await storage.setItem("cache:pageViewsCacheRefresh", true)
        }, config.pageViews.cacheTimeout * 1000)
      }
    }
    return analyticsCache
  }

  if(config.pageViews.preload) {
    if (config.pageViews.debug) console.log("pageViews:preload")

    await refreshAnalyticsCache()
  }

  return defineEventHandler(async (event) => {
    if (config.pageViews.debug) console.time("pageViews:endpoint:handler")
    const query: QueryObject = getQuery(event)
    let path: string = query.path as string

    if (!config.exact && path != "/") {
      path = path.replace(/\/$/, "")
    }

    const analyticsCache = refreshAnalyticsCache()

    if (config.pageViews.debug) console.timeEnd("pageViews:endpoint:handler")

    appendHeader(event, "Access-Control-Allow-Origin", "*")
    appendHeader(event, "Content-Type", "application/json")

    if (analyticsCache != null) {
      if (path === "*") {
        return analyticsCache
      } else if (path in analyticsCache) {
        // @ts-ignore
        return {views: parseInt(analyticsCache[path])}
      }
    }
    return {views: 0, empty: true}
  })
})
