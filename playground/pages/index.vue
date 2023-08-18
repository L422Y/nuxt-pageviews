<template>
  <div>
    <div>Page views: {{ views }}</div>
    <div>Blog views: {{ blogViews }} ({{blogViewsEndSlash}} with ending slash)</div>
    <div>Project Listing views: {{ projectViews }} ({{projectViewsEndSlash}} with ending slash)</div>

    <div>
      <h1>Raw Data</h1>
      <pre>{{ allPageViews }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePageViews} from "../../src/runtime/composables/usePageViews"
import {useState} from "#app"

const views = await usePageViews()
const blogViews = await usePageViews("/blog")
const projectViews = await usePageViews("/projects")
const projectViewsEndSlash = await usePageViews("/projects/")
const blogViewsEndSlash = await usePageViews("/blog/", {exact: true})

const allPageViews = useState<{ [key: string]: string }>("pageViews", () => ( {} ))

</script>
