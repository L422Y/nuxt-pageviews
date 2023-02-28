<template>
  <main>
    <div>{{ views }} views</div>
  </main>
</template>

<script setup>
import {usePageViews} from "../../../src/runtime/composables/usePageViews"

const views = await usePageViews('/fake-path')
</script>
