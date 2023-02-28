<template>
  <div>
    <div>Project Listing views: {{ projectViews }}</div>
  </div>
</template>

<script setup>
import {usePageViews} from "../../src/runtime/composables/usePageViews"

const projectViews = await usePageViews('/projects')
</script>
