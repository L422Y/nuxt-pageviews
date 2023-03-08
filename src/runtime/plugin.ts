import { defineNuxtPlugin, useLazyAsyncData, useRuntimeConfig, useState } from "#app"

export default defineNuxtPlugin(async (app) => {
  let config = useRuntimeConfig()
  const endpoint = config.public.pageViews.endpoint
  const pageViews = await useState("pageviews", () => ( {} ))
  const {data} = await useLazyAsyncData(`views-data`, () => $fetch(`${endpoint}?path=*`))

  if (data.value) {
    pageViews.value = data.value
  }

  return {
    provide: {
      pageViews
    }
  }
})
