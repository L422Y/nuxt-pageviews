import { appendHeader, defineEventHandler, defineLazyEventHandler, getQuery, } from "h3"
import { QueryObject } from "ufo"
import { useRuntimeConfig } from "#imports"
import memoryDriver from "unstorage/drivers/memory"
import { ViewsCache } from "../../types"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import { ViewsCache } from "../../../module"


export default defineLazyEventHandler(async () => {
  const config = await useRuntimeConfig()
  if(!config.exact && path != "/") {
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
