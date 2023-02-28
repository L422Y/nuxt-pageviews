<template>
  <div>
    <div>Blog views: {{ views }}</div>
  </div>
</template>

<script lang="ts" setup>
import { usePageViews } from "#imports"

const views = await usePageViews()
</script>
