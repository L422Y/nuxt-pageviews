<template>
  <div>
    <div>Page views: {{ views }}</div>
    <div>Blog views: {{ blogViews }} ({{blogViewsEndSlash}} with ending slash)</div>
    <div>Project Listing views: {{ projectViews }} ({{projectViewsEndSlash}} with ending slash)</div>
  </div>
</template>

<script setup>
import {usePageViews} from "../../src/runtime/composables/usePageViews"

const views = await usePageViews()
const blogViews = await usePageViews("/blog")
const projectViews = await usePageViews("/projects")
const projectViewsEndSlash = await usePageViews("/projects/")
const blogViewsEndSlash = await usePageViews("/blog/", {exact: true})
</script>
