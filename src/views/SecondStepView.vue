<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";

import { SHAPE, MAX_LENGTH, TRACK_SIZE, MIN_SIZE } from "../utils/constans";

const store = useStore();

const systemMounting = computed(() => store.state.system.systemParams.mounting);

const updateShape = (value) => store.dispatch("shape/updateShape", value);
const shape = computed({
  get() {
    return store.state.shape.shape;
  },
  set(value) {
    console.log("set value", value);
    updateShape(value);
  },
});
const suspensionType = computed({
  get() {
    return store.state.system.systemParams.suspensionType;
  },
  set(value) {
    updateSuspesion(value);
  },
});

const resetShape = () => store.dispatch("shape/resetShape");

const isSuspensionSystem = () => systemMounting.value === "suspended";

const isAddTrackEnable = () => {
  if (isSuspensionSystem.value) {
    return shape.value && suspensionType.value;
  }
  return shape.value;
};

const resetSuspension = () =>
  store.dispatch("system/updateSyspensionType", null);
const updateSuspesion = (value) =>
  store.dispatch("system/updateSyspensionType", value);
</script>
<template>
  <PageTemplateVue>
    <template #main>
      <div class="container container--main">
        <form v-if="systemMounting">
          <fieldset class="form-group">
            <legend class="form-head" :class="{ check: shape }">
              {{ $t("message.selectShape") }}
              <button v-if="shape" @click="resetShape()">
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
              <button v-if="suspensionType" @click.prevent="resetSuspension">
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

            <div
              v-show="!suspensionType && shape"
              class="row radio-group pt-xl-5"
            >
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

          <fieldset v-if="isAddTrackEnable" class="form-group">
            <legend class="form-head">
              {{ $tc("message.addTracks", 2) }}
            </legend>
            <div class="tracks mb-5">
              <!-- Nav tabs -->
              <tabs :on-select="handleSelectTab" class="my-tabs">
                <tab
                  v-for="(side, name) in sidesForTabs"
                  :key="side.name"
                  :title="$t(`tabs.${name}`)"
                >
                  <div class="tracks__config d-flex align-items-center">
                    <div class="tracks__buttons d-flex" ref="tracksButtons">
                      <button
                        class="btn btn-track"
                        @click="enterTrackSize()"
                        type="button"
                      >
                        {{ $t("message.inputSize") }}
                        <span class="plus">+</span>
                      </button>
                      <button
                        class="btn btn-track btn-track--large"
                        type="button"
                        data-length="2500"
                        :disabled="remainsLengthSystem < 2500"
                        @click="handleAddTrackButton(name, $event)"
                      >
                        2500 {{ $t("message.mm") }}
                        <span class="plus">+</span>
                        <svg
                          class="btn-track__size-icon"
                          width="100"
                          height="11"
                          viewBox="0 0 100 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0H1V11H0V0Z" fill="black" />
                          <path d="M0 5H100V6H0V5Z" fill="black" />
                          <path d="M99 0H100V11H99V0Z" fill="black" />
                        </svg>
                      </button>
                      <button
                        class="btn btn-track btn-track--medium"
                        type="button"
                        data-length="2000"
                        :disabled="remainsLengthSystem < 2000"
                        @click="handleAddTrackButton(name, $event)"
                      >
                        2000 {{ $t("message.mm") }}
                        <span class="plus">+</span>
                        <svg
                          class="btn-track__size-icon"
                          width="100"
                          height="12"
                          viewBox="0 0 100 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="0.5" x2="0.5" y2="11" stroke="black" />
                          <line
                            x1="1"
                            y1="5.5"
                            x2="58"
                            y2="5.5"
                            stroke="black"
                          />
                          <line x1="99.5" x2="99.5" y2="11" stroke="black" />
                          <line
                            x1="99"
                            y1="5.5"
                            x2="65"
                            y2="5.5"
                            stroke="black"
                          />
                          <line
                            x1="65.4218"
                            y1="0.268438"
                            x2="58.4218"
                            y2="11.2684"
                            stroke="black"
                          />
                        </svg>
                      </button>
                      <button
                        class="btn btn-track btn-track--small"
                        type="button"
                        data-length="1000"
                        :disabled="remainsLengthSystem < 1000"
                        @click="handleAddTrackButton(name, $event)"
                      >
                        1000 {{ $t("message.mm") }}
                        <span class="plus">+</span>
                        <svg
                          class="btn-track__size-icon"
                          width="100"
                          height="12"
                          viewBox="0 0 100 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="0.5" x2="0.5" y2="11" stroke="black" />
                          <path d="M1 5.5H23.5" stroke="black" />
                          <line x1="99.5" x2="99.5" y2="11" stroke="black" />
                          <path d="M99 5.5L30 5.5" stroke="black" />
                          <line
                            x1="30.4218"
                            y1="0.268438"
                            x2="23.4218"
                            y2="11.2684"
                            stroke="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="tracks__overview" ref="tracksOverview">
                    <small v-if="side.tracks.length">{{
                      $t("message.topView")
                    }}</small>
                    <img
                      class="side-image mr-3"
                      style="max-height: 140px"
                      :src="require(`@/assets/images/${side.side_image}.svg`)"
                      alt=""
                    />
                    <div class="tracks__field d-flex align-items-center">
                      <div
                        v-for="(track, index) in side.tracks"
                        :key="index"
                        class="track"
                        :class="trackLengthClass(track.track_length)"
                      >
                        <span class="track__item">
                          {{ track.track_length }} мм
                        </span>
                        <button
                          type="button"
                          class="track__delete"
                          @click="handleRemoveTrack(name, index, $event)"
                        >
                          <!-- eslint-disable -->
                          <svg
                            width="24px"
                            height="24px"
                            style="enable-background: new 0 0 512 512"
                            viewBox="0 0 512 512"
                          >
                            <g>
                              <g>
                                <line
                                  class="st1"
                                  x1="169.449"
                                  x2="342.551"
                                  y1="169.449"
                                  y2="342.551"
                                />
                                <line
                                  class="st1"
                                  x1="342.551"
                                  x2="169.449"
                                  y1="169.449"
                                  y2="342.551"
                                />
                              </g>
                              <g>
                                <path
                                  d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"
                                />
                              </g>
                            </g>
                            <g id="expanded">
                              <g>
                                <path
                                  d="M267.314,256l80.894-80.894c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256,244.686    l-80.894-80.894c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L244.686,256l-80.894,80.894    c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256,267.314l80.894,80.894    c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L267.314,256z"
                                />
                                <path
                                  d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"
                                />
                              </g>
                            </g>
                          </svg>
                        </button>
                      </div>
                      <!-- eslint-enable -->
                      <div
                        v-if="!side.tracks.length"
                        class="track track--placeholder"
                        @click="showBtnsTooltip()"
                      >
                        <span class="track__item">{{
                          $tc("message.addTracks", 1)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </tab>
              </tabs>
              <span class="tracks__length" v-if="false && totalLength">
                {{ $t("message.totalLength") }}: {{ totalLength }}
                {{ $t("message.mm") }}
              </span>
            </div>
          </fieldset>
        </form>
        <p v-else>
          <b>{{ $t("header.step", [1]) }}</b> {{ $t("errors.notComplete") }}
          <router-link to="/" exact-path>
            {{ $t("message.back") }}
          </router-link>
        </p>
        <TableResult
          v-if="false"
          :show="isAddTrackEnable"
          :total-container-for-tracks="totalContainerForTracks"
          :total-suspension="totalSuspension"
          :corners="corners"
          :flex-connectors="flexConnectors"
          :total-connectors="totalConnectors"
          :total-metalic-connectors="totalMetalicConnectors"
          :stubs="stubs"
          :is-smart-light="isSmartLight"
          :is-power-adaptor="isPowerAdaptor"
        />
      </div>
    </template>
  </PageTemplateVue>
</template>

<style lang="scss" scoped>
@import "../styles/scss/variables";
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

.tracks {
  position: relative;

  &__overview {
    position: relative;

    display: flex;
    width: 100%;
    overflow-x: auto;

    background-color: #f2f2f2;

    small {
      position: absolute;
      left: 20px;

      font-size: 12px;
      color: #777;
    }
  }
  &__config {
    background-color: #d6d6d6;
  }
  &__buttons {
    gap: 15px;
    padding: 20px;
    flex-grow: 1;

    &.tooltipShow .btn {
      background-color: #fff;
    }

    @include media-breakpoint-down(xxl) {
      flex-direction: column;
    }
  }
  &__field {
    padding: 100px 125px;
    padding-left: 175px;

    @include media-breakpoint-down(xxl) {
      padding-left: 0px;
    }
  }
  &__length {
    position: absolute;
    right: 0;
    top: 0;

    font-weight: 600;

    @include media-breakpoint-down(xxl) {
      position: static;

      display: block;
      padding-top: 5px;
    }
  }

  .side-image {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;

    @include media-breakpoint-down(xxl) {
      max-width: 100px;
    }
  }
}

.track {
  position: relative;
  z-index: 10;

  display: flex;
  width: 400px;
  padding-top: 30px;
  margin-right: 5px;

  transition: transform 0.35s;

  &.small {
    width: 160px;
  }
  &.medium {
    width: 250px;
  }
  &--placeholder {
    width: 150px;
    font-size: 12px;

    .track__item {
      background-color: transparent;
      color: #000;
      border: 1px dashed #686868;
      cursor: pointer;
    }
  }
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0);
    transition: 0.35s;
  }
  &:hover::after {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.75);
  }
  &--placeholder:hover::after {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);
  }
  &:hover .track__delete {
    transform: translate3d(0, -3px, 0);
  }
  &.for-remove {
    opacity: 0.4;
    z-index: -1;
    pointer-events: none;

    transform: translate3d(50px, 0, 0);
  }
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 100%;
    height: 45px;
    background-color: #000;
    color: #fff;
  }
  &__delete {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;

    display: block;
    width: 100%;
    height: 30px;

    background-color: $light_accent;
    box-shadow: none;
    border: none;
    filter: saturate(15%);
    transform: translate3d(0, 100%, 0);

    transition-property: opacity, transform;
    transition-duration: 0.35s;

    &:hover {
      filter: saturate(100%);
    }
  }
  @include media-breakpoint-down(xxl) {
    width: 270px;

    &.small {
      width: 150px;
    }
    &.medium {
      width: 220px;
    }
  }
}

.btn-track {
  position: relative;

  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.725rem 0.9375rem;

  font-size: 0.875rem;
  font-weight: 600;

  border: 1px solid #000;
  border-radius: 0;

  transition-duration: 0.33s;
  transition-property: color, background-color;
  background-color: transparent;

  &__size-icon {
    position: absolute;
    bottom: 3px;
    left: 15px;
    width: 80px;
    height: 10px;
  }

  &:hover {
    background-color: #fff;
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

.modal-body {
  @include media-breakpoint-down(xxl) {
    input {
      width: 100%;
    }
  }

  .custom-field {
    min-width: 235px;
  }
}
</style>
