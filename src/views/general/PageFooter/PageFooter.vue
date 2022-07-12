<script setup>
defineProps({
  enableNext: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    requared: true,
    default: "/",
  },
  resetStep: {
    type: Function,
    requared: false,
    default: () => false,
  },
  resetStepEnalbe: {
    type: Boolean,
    default: true,
    requared: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <footer class="page-footer noprint">
    <div
      class="container d-flex justify-content-xl-between flex-wrap align-items-xl-center"
    >
      <div class="wysiwyg">
        <div>
          <b>{{ $t("footer.yourConfig") }}:</b>
          <p class="wysiwyg__text" v-if="mountingFromStore">
            {{ $t("message.embedding") }} -
            {{ $t(`message.${mountingFromStore}`) }},
            {{ $t("message.supply") }} - {{ $t(`message.${placeFromStore}`) }},
            {{ $t("message.controlling") }} -
            {{ $t(`message.${typeFromStore}`) }},
            <template v-if="colorFromStore">
              - {{ $t(`message.${colorFromStore}`) }}.
            </template>
          </p>
        </div>
      </div>
      <div
        v-if="!finished"
        class="d-flex align-items-center page-footer__controlers"
      >
        <button
          v-if="resetStepEnalbe"
          class="btn btn-outline-secondary"
          type="reset"
          @click="resetStep()"
        >
          {{ $t("message.reset") }}
        </button>
        <button
          class="btn btn-light"
          :class="{ 'btn-dark': enableNext }"
          type="submit"
          @click="pushTo($event)"
          :disabled="!enableNext"
        >
          {{ $t("message.continue") }}
        </button>
      </div>
      <slot name="content" />
    </div>
  </footer>
</template>
