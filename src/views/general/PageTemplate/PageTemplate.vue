<script setup>
import PageHeader from "../PageHeader/PageHeader.vue";
</script>

<template>
  <slot name="header">
    <PageHeader />
  </slot>
  <main>
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
