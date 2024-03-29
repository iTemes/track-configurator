<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { Tabs, Tab } from "vue3-tabs-component";
import { Modal } from "bootstrap";

import { MAX_LENGTH, TRACK_SIZE, SHAPE_SQUARE } from "@/utils/constans";

const store = useStore();
const { t } = useI18n();

defineProps({
  isAddTrackEnable: {
    type: Boolean,
    requared: true,
    default: false,
  },
  sidesForTabs: {
    type: Object,
    requared: true,
    default: () => {},
  },
});

const state = reactive({
  currentSide: null,
  currentTabIndex: 0,
  customValue: 0,
  customSizeModal: null,
});

const sizeModal = ref(null);
const tracksOverview = ref([]);

const sidesFromStore = computed(() => store.state.shape.sides);
const shape = computed(() => store.state.shape.shape);

const totalLength = computed({
  get() {
    return store.state.shape.totalLength;
  },
  set(value) {
    store.dispatch("shape/updateLength", value);
  },
});
const remainsLengthSystem = computed(() => MAX_LENGTH - totalLength.value);

const handleSelectTab = (selectedTab) => {
  const selectedTabObject = Object.keys(sidesFromStore.value)[
    selectedTab.tab.index
  ];
  state.currentSide = selectedTabObject;
  state.currentTabIndex = selectedTab.tab.index;
};

const enterTrackSize = () => {
  state.customSizeModal.show();
};

const updatecustomValue = ({ target: { value } }) => {
  state.customValue = value > TRACK_SIZE ? TRACK_SIZE : +value;
};

function calcSideTracksCount(trackLenght) {
  return Math.ceil(trackLenght / TRACK_SIZE);
}
function calcSideConnectors(sideTracks) {
  const connectors = sideTracks - 1;
  if (connectors < 1) {
    return 0;
  }

  return connectors;
}
function handleAddTrackButton(side, event) {
  const dataLength = +event.currentTarget.dataset.length;
  const scrollContainer = tracksOverview.value[state.currentTabIndex];

  addTrackToSide(side, dataLength);
  const scrollPosition = scrollContainer.scrollWidth + dataLength / 10;

  setTimeout(() => {
    scrollContainer.scroll({
      top: 0,
      left: scrollPosition,
      behavior: "smooth",
    });
  }, 400);
}
function handleAddCustomTrack(side, trackSize) {
  let tracksCount = Math.floor(trackSize / TRACK_SIZE);
  const tracksCut = trackSize % TRACK_SIZE;

  while (tracksCount) {
    addTrackToSide(side, 2500);
    tracksCount -= 1;
  }
  if (tracksCut > 50) {
    addTrackToSide(side, tracksCut);
  }
  addTrackToSide(side, trackSize);
  state.customSizeModal.hide();
}
function configTrack(side, trackLenght) {
  const sideToConfig = sidesFromStore.value[side];
  const newTrack = {
    index: sideToConfig.tracks.length,
    name: `${t(`message.${sideToConfig.title}`)} - ${
      sideToConfig.tracks.length + 1
    }`,
    title: sideToConfig.title,
    type: sideToConfig.type,
    track_length: trackLenght,
    track_remains: trackLenght,
    track_lights: [],
  };
  sideToConfig.tracks.push(newTrack);

  sideToConfig.side_total_length += trackLenght;
  sideToConfig.side_total_tracks = calcSideTracksCount(
    sideToConfig.side_total_length
  );
  sideToConfig.side_connectors = calcSideConnectors(sideToConfig.tracks.length);

  if (sideToConfig.side_total_tracks === 0) {
    sideToConfig.side_total_tracks = 1;
  }

  totalLength.value += trackLenght;
}
function removeTrack(side, index) {
  const sideToConfig = sidesFromStore.value[side];
  const { tracks } = sideToConfig;
  const lengthForDelete = tracks[index].track_length;
  totalLength.value -= lengthForDelete;

  sideToConfig.side_total_length -= lengthForDelete;
  sideToConfig.side_total_tracks = calcSideTracksCount(
    sideToConfig.side_total_length
  );
  sideToConfig.side_connectors = calcSideConnectors(sideToConfig.tracks.length);

  setTimeout(() => {
    tracks.splice(index, 1);
    // Пересчет индексов
    tracks.forEach((track, idx) => {
      track.index = idx;
      track.name = `${t(`message.${sideToConfig.title}`)} - ${idx + 1}`;
    });
  }, 300);
}
function addTrackToSide(side, trackLenght) {
  configTrack(side, trackLenght);
  duplicateTrack(side, trackLenght);
}
function duplicateTrack(side, trackLenght) {
  if (shape.value !== SHAPE_SQUARE) {
    return;
  }
  const mirrorSide = side === "side_A" ? "side_C" : "side_D";
  configTrack(mirrorSide, trackLenght);
}
function handleRemoveTrack(side, index) {
  removeTrack(side, index);
  removeMirrorTrack(side, index);
}
function removeMirrorTrack(side, index) {
  if (shape.value !== SHAPE_SQUARE) {
    return;
  }

  const mirrorSide = side === "side_A" ? "side_C" : "side_D";

  removeTrack(mirrorSide, index);
}
function trackLengthClass(value) {
  if (value <= 1000) {
    return "small";
  }
  if (value <= 2000) {
    return "medium";
  }
  return "big";
}

onMounted(() => {
  state.currentSide = null;
  state.customSizeModal = new Modal(sizeModal.value);
});
</script>

<template>
  <fieldset v-if="isAddTrackEnable" class="form-group">
    <legend class="form-head">
      {{ t("message.addTracks", 2) }}
    </legend>
    <div class="tracks mb-5">
      <tabs
        :options="{ useUrlFragment: false }"
        cache-lifetime="0"
        @changed="handleSelectTab"
        nav-class="my-tabs"
        nav-item-class="tab-item"
      >
        <tab
          v-for="(side, name) in sidesForTabs"
          :key="side.name"
          :name="t(`tabs.${name}`)"
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
                  <line x1="1" y1="5.5" x2="58" y2="5.5" stroke="black" />
                  <line x1="99.5" x2="99.5" y2="11" stroke="black" />
                  <line x1="99" y1="5.5" x2="65" y2="5.5" stroke="black" />
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
            <small v-if="side.tracks.length">{{ t("message.topView") }}</small>
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
                <span class="track__item"> {{ track.track_length }} мм </span>
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
              <div v-if="!side.tracks.length" class="track track--placeholder">
                <span class="track__item">{{ t("message.addTracks", 1) }}</span>
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
  <!-- Modal -->
  <div
    ref="sizeModal"
    class="modal fade"
    id="sizeModal"
    tabindex="-1"
    aria-labelledby="sizeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sizeModalLabel">Введите длинну трека</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <input
            :value="customValue"
            @input="updatecustomValue"
            min="200"
            max="2500"
            type="number"
            name="customValue"
            step="100"
            placeholder="200-2500"
            id="customValue"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>
          <button
            :disabled="customValue < minSize"
            @click="handleAddCustomTrack(state.currentSide, state.customValue)"
            type="button"
            class="btn btn-dark"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.my-tabs {
  display: flex;
  margin-bottom: 0px;

  list-style: none;
  padding-left: 0;
  border-bottom: 1px solid #e2e2e2;
}
.tab-item {
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
}
.tab-item a {
  text-decoration: none;
  color: #000;
}
.tab-item.is-active {
  background-color: #d6d6d6;
}
</style>

<style lang="scss" scoped>
@import "@/styles/scss/variables";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

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
