<template>
  <div>
    <div>Page views: {{ views }}</div>
    <div>Blog views: {{ blogViews }}</div>
    <div>Project Listing views: {{ projectViews }}</div>
  </div>
</template>

<script setup>
import {usePageViews} from "../../src/runtime/composables/usePageViews"

const views = await usePageViews()
const blogViews = await usePageViews("/blog")
const projectViews = await usePageViews("/projects")
</script>
