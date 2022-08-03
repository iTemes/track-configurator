<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";

import { SHAPE, MIN_SIZE, SUSPENDED } from "@/utils/constans";

const state = reactive({
  corners: 0,
  stubs: 0,
  customValue: null,
  minSize: MIN_SIZE,
});

const store = useStore();

// System
const resetSuspension = () => (suspensionType.value = null);

const systemMounting = computed(() => store.state.system.systemParams.mounting);
const suspensionType = computed({
  get() {
    return store.state.system.systemParams.suspensionType;
  },
  set(value) {
    store.dispatch("system/updateSyspensionType", value);
  },
});
const isSuspensionSystem = computed(() => systemMounting.value === SUSPENDED);
const totalLength = computed({
  get() {
    return store.state.shape.totalLength;
  },
  set(value) {
    store.dispatch("shape/updateLength", value);
  },
});

// Shape
const updateShape = (value) => store.dispatch("shape/updateShape", value);
const resetShape = () => updateShape(null);

const shape = computed({
  get() {
    return store.state.shape.shape;
  },
  set(value) {
    updateShape(value);
  },
});
const sidesFromStore = computed({
  get() {
    return store.state.shape.sides;
  },
  set(value) {
    store.dispatch("shape/updateSides", value);
  },
});

onMounted(() => {
  if (shape.value) {
    const { corners, sides, stubs } = SHAPE[shape.value];
    state.stubs = stubs;
    state.corners = corners;
    !sidesFromStore.value && (sidesFromStore.value = sides);
  }
});

watch(
  () => shape.value,
  (newShape) => {
    if (!newShape) return;

    const { corners, sides, stubs } = SHAPE[newShape];
    sidesFromStore.value = sides;
    state.corners = corners;
    state.stubs = stubs;
    totalLength.value = 0;

    store.dispatch("shape/setShapeOnStorage");
  }
);
</script>

<template>
  <form>
    <fieldset class="form-group">
      <legend class="form-head" :class="{ check: shape }">
        {{ $t("message.selectShape") }}
        <button type="button" v-if="shape" @click="resetShape()">
          {{ $t(`message.${shape}`) }}
        </button>
        <svg
          v-if="shape"
          class="tick"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
          />
        </svg>
      </legend>

      <div v-show="!shape" class="row radio-group pt-xl-5">
        <div class="col-6 col-md-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="shape-line"
          >
            <input
              id="shape-line"
              v-model="shape"
              class="visually-hidden"
              type="radio"
              name="shape"
              value="shape-line"
            />
            <span class="radio-group__title">{{
              $t(`message.${["shape-line"]}`)
            }}</span>
            <span class="shape-box">
              <svg width="84" height="10" viewBox="0 0 84 10" fill="none">
                <rect width="84" height="10" fill="#999999" />
              </svg>
            </span>
          </label>
        </div>
        <div class="col-6 col-md-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="shape-corner"
          >
            <input
              id="shape-corner"
              v-model="shape"
              class="visually-hidden"
              type="radio"
              name="shape"
              value="shape-corner"
            />
            <span class="radio-group__title">{{
              $t(`message.${["shape-corner"]}`)
            }}</span>
            <span class="shape-box">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                <path d="M0 74H84V84H0V74Z" fill="#999999" />
                <rect width="10" height="84" fill="#999999" />
              </svg>
            </span>
          </label>
        </div>
        <div class="col-6 col-md-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="shape-u"
          >
            <input
              id="shape-u"
              v-model="shape"
              class="visually-hidden"
              type="radio"
              name="shape"
              value="shape-u"
            />
            <span class="radio-group__title">{{
              $t(`message.${["shape-u"]}`)
            }}</span>
            <span class="shape-box">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                <path d="M0 74H84V84H0V74Z" fill="#999999" />
                <rect width="10" height="84" fill="#999999" />
                <rect x="74" width="10" height="84" fill="#999999" />
              </svg>
            </span>
          </label>
        </div>
        <div class="col-6 col-md-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="shape-square"
          >
            <input
              id="shape-square"
              v-model="shape"
              class="visually-hidden"
              type="radio"
              name="shape"
              value="shape-square"
            />
            <span class="radio-group__title">{{
              $t(`message.${["shape-square"]}`)
            }}</span>
            <span class="shape-box">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                <path d="M0 74H84V84H0V74Z" fill="#999999" />
                <rect width="10" height="84" fill="#999999" />
                <path d="M84 10H0V0H84V10Z" fill="#999999" />
                <rect
                  x="84"
                  y="84"
                  width="10"
                  height="84"
                  transform="rotate(180 84 84)"
                  fill="#999999"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </fieldset>

    <fieldset
      v-if="isSuspensionSystem && shape"
      class="form-group form-group--suspension"
    >
      <legend class="form-head" :class="{ check: suspensionType }">
        {{ $t("message.selectSuspension") }}
        <button
          type="button"
          v-if="suspensionType"
          @click.prevent="resetSuspension"
        >
          {{ $t(`message.${suspensionType}`) }}
        </button>
        <svg
          v-if="suspensionType"
          class="tick"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
          />
        </svg>
      </legend>

      <div v-show="!suspensionType && shape" class="row radio-group pt-xl-5">
        <div class="col-12 col-md-6 col-lg-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="suspension-tros"
          >
            <input
              id="suspension-tros"
              v-model="suspensionType"
              class="visually-hidden"
              type="radio"
              name="suspensionType"
              value="suspension-tros"
            />
            <span class="radio-group__title">{{
              $t(`message.${["suspension-tros"]}`)
            }}</span>
            <span class="shape-box shape-box--tross" />
          </label>
        </div>
        <div class="col-12 col-md-6 col-lg-3 radio-group__item">
          <label
            class="d-flex flex-column align-items-center justify-content-center"
            for="suspension-tros-hide"
          >
            <input
              id="suspension-tros-hide"
              v-model="suspensionType"
              class="visually-hidden"
              type="radio"
              name="suspensionType"
              value="suspension-tros-hide"
            />
            <span class="radio-group__title">{{
              $t(`message.${["suspension-tros-hide"]}`)
            }}</span>
            <span class="shape-box shape-box--hide" />
          </label>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
@import "@/styles/scss/variables";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
.radio-group {
  &__item {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    &:hover {
      label {
        background-color: $light_shades;

        @include media-breakpoint-down(xxl) {
          background-color: #fff;
        }
      }

      svg {
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
        transform: translate3d(-5px, -5px, 0);
      }
      svg path,
      svg rect {
        fill: #000;
      }
    }

    label {
      position: absolute;
      top: 0;
      left: 15px;
      right: 15px;
      bottom: 0;

      background-color: #fff;
      cursor: pointer;
    }

    svg {
      transition: transform 0.33s;
    }

    @include media-breakpoint-down(xxl) {
      margin-bottom: 2rem;
    }
  }
  &__title {
    position: absolute;
    top: 20px;
    font-family: BellGothic, $systemfont;
    font-weight: 600;
    text-transform: uppercase;

    @include media-breakpoint-down(xxl) {
      top: -5px;
    }
  }
}
.form-group--suspension .shape-box {
  height: 100%;
  width: 100%;

  background-position: center;
  background-repeat: no-repeat;
}
.shape-box--tross {
  background-image: url("https://www.centrsvet.ru/media/uploads/icon_400_400/podves_b1_400.jpg");
}
.shape-box--hide {
  background-image: url("https://www.centrsvet.ru/media/uploads/icon_400_400/podvesi_vintb_400.jpg");
}
</style>
