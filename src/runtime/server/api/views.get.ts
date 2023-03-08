import { appendHeader, defineEventHandler, getQuery, } from "h3"
import { QueryObject } from "ufo"
import { useGoogleAnalyticsViews } from "../../composables/useGoogleAnalyticsViews"
import { useRuntimeConfig } from "#imports"
import memoryDriver from "unstorage/drivers/memory"
import { ViewsCache } from "../../types"
import { createStorage } from "unstorage"

const storage = createStorage({
  driver: memoryDriver(),
})

storage.setItemRaw("cache:analytics", null)
storage.setItemRaw("cache:analyticsCacheProcessing", false)
storage.setItemRaw("cache:analyticsCacheRefresh", false)

export default defineEventHandler(async (event) => {
  let analyticsCache: ViewsCache = ( await storage.getItemRaw("cache:analytics") ) as ViewsCache
  const analyticsCacheProcessing = ( await storage.getItemRaw("cache:analyticsCacheProcessing") ) as boolean
  const analyticsCacheRefresh = ( await storage.getItemRaw("cache:analyticsCacheRefresh") ) as boolean

  appendHeader(event, "Access-Control-Allow-Origin", "*")
  appendHeader(event, "Content-Type", "application/json")

  const query: QueryObject = getQuery(event)
  let path: string = query.path as string
  const config = await useRuntimeConfig()
  if(!config.exact) {
    path = path.replace(/\/$/,'')
  }

  const shouldRefresh = !analyticsCacheProcessing && ( analyticsCache === null || analyticsCacheRefresh )

  if (shouldRefresh) {
    analyticsCache = await useGoogleAnalyticsViews(config, analyticsCache)
    await storage.setItemRaw("cache:analytics", analyticsCache)
  }

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
