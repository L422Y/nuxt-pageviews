# Nuxt Page Views Module

[npm version][npm-version-href]
[npm downloads][npm-downloads-href]
[License][license-href]
[Nuxt][nuxt-href]

This is a module for Nuxt that provides page views tracking using Google Analytics Data API.

It is built with Vue 3, Typescript, and H3.

## Features

- Quick setup if you're already running Google Analytics
- SSR Support
- Cached responses from the Google Analytics Data API

## Quick Setup

1. Add `nuxt-pageviews` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-pageviews

# Using yarn
yarn add --dev nuxt-pageviews

# Using npm
npm install --save-dev nuxt-pageviews
```

2. Add `nuxt-pageviews` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-pageviews'
  ]
})
```

## Usage

To use this plugin, you need to provide a Google service account credentials file, a Google Analytics property ID, and an endpoint for the API that will serve the data.

In your `nuxt.config.js` file, add the plugin to the `buildModules` section:

```ts
export default {
    buildModules: [
        "nuxt-pageviews",
    ],
    pageViews: {
        credentialsFile: "./src/google-service-account.json",
        propertyId: "12345678",
        endpoint: "/api/views"
    }
}
```

You can use the `usePageViews` composable to access the page views count for a specific page:

```vue
<template>
  <div>
    <div>Blog views: {{ views }}</div>
  </div>
</template>

<script lang="ts" setup>
import { usePageViews } from "#imports"

const views = await usePageViews()
</script>
```

You can also pull the counts for other paths:

```vue
<template>
  <div>
    <div>Page views: {{ views }}</div>
    <div>Blog views: {{ blogViews }}</div>
    <div>Project Listing views: {{ projectViews }}</div>
  </div>
</template>

<script setup>
import { usePageViews } from "#imports"

const views = await usePageViews()
const blogViews = await usePageViews("/blog")
const projectViews = await usePageViews("/projects")
</script>
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

## [✨  Change Log](/CHANGELOG.md)

## License

This plugin is licensed under the MIT License. See the LICENSE file for more information.


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-pageviews/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/nuxt-pageviews

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-pageviews.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/nuxt-pageviews

[license-src]: https://img.shields.io/npm/l/nuxt-pageviews.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/nuxt-pageviews

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com

