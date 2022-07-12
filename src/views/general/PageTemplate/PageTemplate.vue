<script setup>
import PageHeader from "../PageHeader/PageHeader.vue";
</script>

<template>
  <div>
    <slot name="header">
      <PageHeader />
    </slot>
    <slot name="main" />
    <slot name="footer" />
  </div>
</template>
