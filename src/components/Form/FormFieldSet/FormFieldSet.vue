<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { useI18n } from "vue-i18n";
import FormInput from "../FormInput/FormInput.vue";

const { t } = useI18n();

const store = useStore();

const props = defineProps({
  title: {
    type: String,
    requared: false,
    default: "",
  },
  inputsGroup: {
    type: Array,
    requared: false,
    default: () => [],
  },
  modelValue: {
    type: String,
    requared: true,
    default: "",
  },
});

const valueFromStore = computed({
  get() {
    return store.state.system.systemParams[props.modelValue];
  },
  set(value) {
    store.dispatch("system/updateSystemParameter", {
      parameter: props.modelValue,
      value,
    });
  },
});
</script>

<template>
  <fieldset v-if="valueFromStore !== underfined" class="form-group mb-5">
    <legend class="form-head">
      {{ t(`message.${title}`) }}
    </legend>
    <div class="row radio-group">
      <div
        class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item"
        v-for="input in inputsGroup"
        :key="input.id"
      >
        <FormInput
          :type="input.type"
          :name="input.name"
          :id="input.id"
          v-model="valueFromStore"
          :value="input.value"
        />
        {{ message }}
      </div>
    </div>
    <div v-if="false" class="row radio-group">
      <div
        class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item"
      >
        <label class="d-flex align-items-center" for="recessed-mounting">
          <input
            tabindex="1"
            class="visually-hidden"
            v-model="mounting"
            type="radio"
            name="system-mounting"
            id="recessed-mounting"
            value="recessed"
          />
          <span class="custom-checkbox" />
          <span>{{ t("message.recessed") }}</span>
        </label>
      </div>
      <div
        class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item"
      >
        <label class="d-flex align-items-center" for="surface-mounting">
          <input
            tabindex="1"
            class="visually-hidden"
            v-model="mounting"
            type="radio"
            name="system-mounting"
            id="surface-mounting"
            value="surface"
          />
          <span class="custom-checkbox" />
          <span>{{ t("message.surface") }}</span>
        </label>
      </div>
      <div
        class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item"
      >
        <label class="d-flex align-items-center" for="suspended-mounting">
          <input
            tabindex="1"
            class="visually-hidden"
            v-model="system_mounting"
            type="radio"
            name="system-mounting"
            id="suspended-mounting"
            value="suspended"
          />
          <span class="custom-checkbox" />
          <span>{{ t("message.suspended") }}</span>
        </label>
      </div>
      <div
        class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item"
      >
        <label class="d-flex align-items-center" for="stretch-ceiling-mounting">
          <input
            tabindex="1"
            class="visually-hidden"
            v-model="system_mounting"
            type="radio"
            name="system-mounting"
            id="stretch-ceiling-mounting"
            value="stretch-ceiling"
          />
          <span class="custom-checkbox" />
          <span>{{ t("message.stretch-ceiling") }}</span>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.radio-group {
  &__item {
    @include media-breakpoint-down(xxl) {
      margin-bottom: 1rem;
    }
  }

  &__tooltip {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    margin-left: 1rem;
    width: 35px;
    height: 35px;

    font-size: 1rem;
    font-weight: 600;

    border: 1px solid;
    background-color: #fff;
    color: #000;
    cursor: pointer;

    transition: 0.35s;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}

.form-head {
  position: relative;

  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #000;
  font-family: BellGothic, $systemfont;
  font-size: 1.0625rem;
  font-weight: 600;

  margin-bottom: 2em;
  text-transform: uppercase;

  @include media-breakpoint-up(xxl) {
    font-size: 1.2625rem;
  }

  &.check {
    padding-left: 2rem;
  }

  .tick {
    position: absolute;
    top: 5px;
    left: 0;
  }

  button {
    max-width: 350px;

    text-align: left;
    color: #adb5bd;

    @include resetBtnStyle;

    &:hover {
      color: #000;
    }
  }
}

.form-group {
  @include media-breakpoint-down(md) {
    &__text {
      font-size: 0.7rem;
      max-width: 200px;

      &--power {
        max-width: 135px;
        font-weight: 600;
        text-align: right;
      }
    }
  }
}
</style>
