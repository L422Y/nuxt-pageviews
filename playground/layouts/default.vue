<template>
  <main>
    <nav>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/blog">
        Blog
      </NuxtLink>
      <NuxtLink to="/projects">
        Projects
      </NuxtLink>
    </nav>
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>

</script>

<style scoped>
main {
  font-family: "Helvetica Neue", Arial, sans-serif;
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>
