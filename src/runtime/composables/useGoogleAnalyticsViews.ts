import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { ModuleOptions } from "../../module"
import { ViewsCache } from "../types"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"

const storage = createStorage({
  driver: memoryDriver(),
})

export const useGoogleAnalyticsViews = async (config: any, analyticsCache: ViewsCache) => {
  let restTimer: any
  const {credentialsFile, propertyId}: ModuleOptions = config.pageViews
  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: credentialsFile
  })

  await storage.setItem("cache:analyticsCacheRefresh", false)
  await storage.setItem("cache:analyticsCacheProcessing", true)
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{"name": "pagePath"}],
    "dateRanges": [{"startDate": "2018-12-31", "endDate": "today"},],
    metrics: [{"name": "screenPageViews"}],
    dimensionFilter: {
      "filter":
        {
          fieldName: "pagePath",
          stringFilter: {
            matchType: "BEGINS_WITH",
            value: "/"
          }
        }
    },
  })

  const results: { [key: string]: string } = {}
  if (response.rows) {
    for (const row of response.rows) {
      if (row && row.dimensionValues && row.dimensionValues.length > 0 && row.metricValues) {
        const key = row.dimensionValues[0].value as string
        // @ts-ignore
        results[key] = row.metricValues[0].value as number
      }
    }
    await storage.setItem("cache:analytics", results)
    await storage.setItem("cache:analyticsCacheProcessing", false)
    analyticsCache = results

    clearTimeout(restTimer)
    setTimeout(async () => {
      await storage.setItem("cache:analyticsCacheRefresh", true)
    }, 15 * 60 * 1000)
  }
  return analyticsCache
}
