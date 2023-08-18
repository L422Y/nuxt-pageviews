import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { ModuleOptions } from "../../module"

export const googleAnalytics = async (config: any, storage: any) => {
  let restTimer: any
  const {credentialsFile, credentials, propertyId, exact, startDate, debug}: ModuleOptions = config.pageViews
  let opts = {}

  if (credentials) {
    opts["credentials"] = credentials
  } else if (credentialsFile) {
    opts["keyFilename"] = credentialsFile
  } else {
    throw new Error("Unable to locate Google Analytics credentials")
  }

  if (debug) console.time("provider:googleAnalytics:refresh")
  const analyticsDataClient = new BetaAnalyticsDataClient(opts)

  const params = {
    property: `properties/${propertyId}`,
    dimensions: [{"name": "pagePath"}],
    dateRanges: [{"startDate": startDate, "endDate": "today"},],
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
  }
  if(debug) console.log("provider:googleAnalytics:params", params)

  const [response] = await analyticsDataClient.runReport(params)

  const results: { [key: string]: number } = {}
  if (response.rows) {
    for (const row of response.rows) {
      if (row && row.dimensionValues && row.dimensionValues.length > 0 && row.metricValues) {
        let key = row.dimensionValues[0].value as string
        if (!exact && key != "/") {
          key = key.replace(/\/$/, "")
        }
        if (key in results) {
          results[key] += parseInt(row.metricValues[0].value)
        } else {
          results[key] = parseInt(row.metricValues[0].value)
        }
      }
    }
    if (debug) console.timeEnd("provider:googleAnalytics:refresh")
  }
  return results
}
