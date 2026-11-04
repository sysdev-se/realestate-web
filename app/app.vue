<template>
  <UApp>
    <NuxtLayout :name="$deviceLayout.current">
      <!-- Keyed by the full URL, so /listings?page=2 reloads its data like a new page. -->
      <NuxtPage :page-key="(route) => route.fullPath" />
    </NuxtLayout>
  </UApp>
</template>
