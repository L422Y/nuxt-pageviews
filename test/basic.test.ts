import { describe, expect, it, vi } from "vitest"
import { fileURLToPath } from "node:url"
import { $fetch, setup } from "@nuxt/test-utils"
import { ref } from "vue"
import * as GAV from "../src/runtime/composables/useGoogleAnalyticsViews"


describe("ssr", async () => {
    await setup({
      rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
    })
    // const fakeCache = ref({})
    //
    // const useGoogleAnalyticsViewsMock = vi.fn(async (config, analyticsCache) => {
    //   return {
    //     "/fake-path": "54321",
    //     "/": "12345"
    //   }
    // })
    // vi.spyOn(GAV, "useGoogleAnalyticsViews").mockImplementation(useGoogleAnalyticsViewsMock)

    it("renders a view count", async () => {
      const html = await $fetch("/")
      expect(html).toContain("<div>0 views</div>")
    })

    it("api responds with a view count", async () => {
      const response = await $fetch(`/api/views?path=/`)
      expect(JSON.stringify(response)).toContain(`{"views"`)
    })
  }
)
