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

let mountingFromStore = false;
</script>
<template>
  <footer class="page-footer noprint">
    <div
      class="container d-flex justify-content-xl-between flex-wrap align-items-xl-center"
    >
      <div class="config-result">
        <div>
          <b>{{ $t("footer.yourConfig") }}:</b>
          <p class="config-result__text" v-if="mountingFromStore">
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

<style scoped lang="scss">
.page-footer {
  position: fixed;

  width: 100%;
  bottom: 0;
  left: 0;
  background-color: $primary;

  z-index: 998;

  .container {
    height: 100%;
    padding: 16px 0;

    @include media-breakpoint-down(xl) {
      justify-content: flex-end;
      padding: 0;
    }
  }

  p {
    margin: 0;
  }

  .config-result {
    &__text {
      font-size: 14px;
    }

    @include media-breakpoint-down(xl) {
      display: none;
    }
  }

  @include media-breakpoint-down(xxl) {
    flex-direction: column;
    height: auto;
    padding-top: 10px;
    padding-bottom: 20px;
  }
}
</style>
