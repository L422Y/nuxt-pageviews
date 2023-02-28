# Nuxt Page Views Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This is a module for Nuxt that provides page views tracking using Google Analytics Data API.

It is built with Vue 3, Typescript, and H3.

### Features

- Quick setup if you're already running Google Analytics
- SSR Support
- Cached responses from the Google Analytics Data API

## Configuration

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



### Google Analytics Setup

You will need to configure a new service account, and add its email address to the GA property you would like to access.

Here are the steps to set up credentials for use with @google-analytics/data:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
1. Create a new project or select an existing project.
1. Enable the Google Analytics API for your project:
  2. Go to the APIs & Services dashboard, click on "Enable
     APIs and Services", and search for "Google Analytics API". Then click "Enable".
1. Create credentials for your project:
  2. Go to the "Credentials" page in the APIs & Services dashboard and
     click "Create credentials". Select "Service Account" as the credential type and enter the required information.
     3. Make sure to add the appropriate scopes for the API you're using (in this case,` https://www.googleapis.com/auth/analytics.readonly`).
1. Once you've created the service account, download the JSON key file for the service account. This file will contain
   the private key that you'll need to authenticate with the API, as well as the service account "email" address you will need to add as a user to your Analytics property.

## Nuxt Configuration

To use this plugin, you need to provide a Google service account credentials file, a Google Analytics property ID, and
an endpoint for the API that will serve the data.

In your `nuxt.config.js` file, add the plugin to the `modules` section, and configure the options for the module:

```ts
export default {
  modules: [
    "nuxt-pageviews",
  ],
  pageViews: {
    credentialsFile: "./src/creds.json",
    propertyId: "12345678",
    endpoint: "/api/views"
  }
}
```

## Using

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
    <div>Project List views: {{ projectViews }}</div>
  </div>
</template>

<script setup>
import {usePageViews} from "#imports"

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

## [✨ Change Log](/CHANGELOG.md)

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

