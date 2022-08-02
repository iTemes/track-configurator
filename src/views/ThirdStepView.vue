<script setup>
import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import PageFooter from "./general/PageFooter/PageFooter.vue";
</script>

<template>
  <PageTemplateVue>
    <template #main>
      <div class="container mt-5">
        <h1>Добавить светильники</h1>
      </div>
    </template>

    <template #footer>
      <PageFooter
        :enable-next="nextStep"
        @reset-step="resetStep"
        link="/secondStep"
      />
    </template>
  </PageTemplateVue>
</template>
