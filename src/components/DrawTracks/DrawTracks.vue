<script setup>
import { reactive, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

import SearchProductsList from "@/components/SearchProductList/SearchProductList.vue";

import { SVG } from "@svgdotjs/svg.js";
import smoothscroll from "smoothscroll-polyfill";
import { Tooltip } from "bootstrap";
import { v4 as uuidv4 } from "uuid";

import {
  VER_TRACK_WIDTH,
  VER_TRACK_HEIGHT,
  HOR_TRACK_WIDTH,
  HOR_TRACK_HEIGHT,
  TRACK_OFFSET,
  MAX_CANVAS_HEIGHT,
  VER_TYPE,
  VER_TYPE_REVERS,
  HOR_TYPE,
  HOR_TYPE_REVERS,
} from "@/utils/constans";

const state = reactive({
  enableRelatedList: false,
  enableProductList: false,
  startX: 75,
  startY: 100,
  tracks: {},
  currentTrack: null,
  draw: null,
  defs: null,
  sideA: null,
  sideB: null,
  sideC: null,
  sideD: null,
});

const store = useStore();

const props = defineProps({
  showResult: {
    type: Boolean,
    requared: false,
    default: false,
  },
  powerSupply: {
    type: Number,
    requared: true,
  },
});

const sideProducts = ref(null);

const sidesFromStore = computed(() => store.state.shape.sides);
const isIntegratedControl = computed(
  () => store.state.system.systemParams.controlPlace === "integrated-control"
);
const isTrackFullLength = computed(
  () => state.currentTrack?.track_remains <= 250
);
const addedSubproducts = computed(() => store.state.products.addedSubproducts);
const relatedSubProducts = computed(() => {
  // Находим уникальные объекты по id из 1С
  let unicArrFromObjects = addedSubproducts.value.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  unicArrFromObjects = Object.keys(unicArrFromObjects).map(
    (id) => unicArrFromObjects[id]
  );
  return unicArrFromObjects;
});

function initDraw() {
  if (!sidesFromStore.value) {
    return;
  }
  const { side_A, side_B, side_C, side_D } = { ...sidesFromStore.value };

  // Формируем список треков со всех сторон для отрисовки
  side_A?.tracks && (state.tracks = { [side_A.title]: [...side_A.tracks] });
  side_B?.tracks &&
    (state.tracks = { ...state.tracks, [side_B.title]: [...side_B.tracks] });
  side_C?.tracks &&
    (state.tracks = { ...state.tracks, [side_C.title]: [...side_C.tracks] });
  side_D?.tracks &&
    (state.tracks = { ...state.tracks, [side_D.title]: [...side_D.tracks] });

  // Расчет размеров канваса SVG
  const canvasWidth = calculateCanvasWidth(side_B, HOR_TRACK_WIDTH);
  let viewBoxHeight;
  if (side_C && side_C.tracks.length > side_A.tracks.length) {
    viewBoxHeight = calculateCanvasHeight(side_C, VER_TRACK_HEIGHT);
  } else {
    viewBoxHeight = calculateCanvasHeight(side_A, VER_TRACK_HEIGHT);
  }
  const canvasHeight =
    viewBoxHeight > MAX_CANVAS_HEIGHT ? MAX_CANVAS_HEIGHT : viewBoxHeight;

  // Добавляем объекты SVG в дата, для доступа из методов
  state.draw = SVG().addTo(".system-visuall").size(canvasWidth, canvasHeight);
  state.draw.attr("viewBox", `0 0 ${canvasWidth} ${viewBoxHeight}`);
  state.defs = state.draw.defs();
  state.sideA = state.draw.group().attr("data-side", "sideA");
  state.sideB = state.draw.group().attr("data-side", "sideB");
  state.sideC = state.draw.group().attr("data-side", "sideC");
  state.sideD = state.draw.group().attr("data-side", "sideD");

  // TODO REFACTOR DRAW SIDES
  // this.drawSides(side_A, side_B, side_C, side_D);
  if (side_C && side_C.side_total_length > side_A.side_total_length) {
    // если 3-я сторона длинне, начинем отрисовку от нее
    // смещаем ее отрисовку на длинну второй стороны
    state.startX = side_B.tracks.reduce((acc, track) => {
      const length =
        calcRectangleWidthFromLength(track.track_length) + TRACK_OFFSET;

      return (acc += length);
    }, 50);
    side_C &&
      side_C.tracks.forEach((track) => {
        createTrackRect(
          VER_TYPE,
          VER_TRACK_WIDTH,
          track.track_length,
          state.sideC,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
    // Вторая сторона
    // Нужно знать конец третьей стороны
    // смещение по оси Х для начала отрисовки
    state.startX += HOR_TRACK_HEIGHT + TRACK_OFFSET;
    side_B &&
      side_B.tracks.forEach((track) => {
        createTrackRect(
          HOR_TYPE_REVERS,
          track.track_length,
          HOR_TRACK_HEIGHT,
          state.sideB,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
    // Первая сторона
    // Нужно отрисовывать после второй
    side_A &&
      side_A.tracks.forEach((track) => {
        createTrackRect(
          VER_TYPE_REVERS,
          VER_TRACK_WIDTH,
          track.track_length,
          state.sideA,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
  } else {
    // Первая сторона
    side_A &&
      side_A.tracks.forEach((track, idx) => {
        createTrackRect(
          VER_TYPE,
          VER_TRACK_WIDTH,
          track.track_length,
          state.sideA,
          TRACK_OFFSET,
          track
        );
        if (idx === 0 && isIntegratedControl) {
          if (track.track_remains > 300) {
            track.insertPower = true;
            track.track_remains -= 300;
          }
        }
        // Повторая отрисовка иконок светильников
        reDrawCirclesAfterReload(track);
      });
    // Вторая сторона
    // Нужно знать конец первой стороны
    side_B &&
      side_B.tracks.forEach((track) => {
        createTrackRect(
          HOR_TYPE,
          track.track_length,
          HOR_TRACK_HEIGHT,
          state.sideB,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
    // Третья сторона
    // Нужно знать конец второй стороны
    state.startX -= VER_TRACK_WIDTH + TRACK_OFFSET;
    side_C &&
      side_C.tracks.forEach((track) => {
        createTrackRect(
          VER_TYPE_REVERS,
          VER_TRACK_WIDTH,
          track.track_length,
          state.sideC,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
    // Четвертая сторона
    // Копия второй снизу
    // смещение по оси Х для начала отрисовки
    state.startX = 75;
    state.startY -= VER_TRACK_WIDTH + TRACK_OFFSET;
    side_D &&
      side_D.tracks.forEach((track) => {
        createTrackRect(
          HOR_TYPE,
          track.track_length,
          HOR_TRACK_HEIGHT,
          state.sideD,
          TRACK_OFFSET,
          track
        );
        reDrawCirclesAfterReload(track);
      });
  }
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );
}
function reDrawCirclesAfterReload(track) {
  track.track_lights.forEach((light) => {
    const groupByIndex = state[light.title].findOne(
      `g[data-index='${light.groupByIndex}']`
    );
    store.dispatch("products/addSubproduct", light);
    createLightCircle(
      groupByIndex,
      light.xRect,
      light.yRect,
      light.icon_image1,
      light.type,
      light.lightsCount,
      light.uuid,
      light.name
    );
  });
}
function createTrackRect(type, width, height, group, ofsset, track) {
  let RectHeight = height;
  let RectWidth = width;

  switch (type) {
    case "HOR":
      RectWidth = calcRectangleWidthFromLength(width);
      break;
    case "HOR-REVERS":
      RectWidth = calcRectangleWidthFromLength(width);
      state.startX -= RectWidth + ofsset;
      break;
    case "VER":
      RectHeight = calcRectangleWidthFromLength(height);
      break;
    case "VER-REVERS":
      RectHeight = calcRectangleWidthFromLength(height);
      state.startY -= RectHeight + ofsset;
      break;
    default:
      break;
  }
  const trackWrapper = group.group().attr({
    class: "g-track-wrapper",
    "data-index": track.index,
    "data-title": track.title,
  });
  const trackItem = trackWrapper.rect(RectWidth, RectHeight).attr({
    fill: "#7f7f7f",
    x: state.startX,
    y: state.startY,
    class: "g-track",
    title: track.name,
    "data-name": track.name,
    "data-index": track.index,
    "data-title": track.title,
    "data-length": track.track_length,
    "data-bs-toggle": "tooltip",
  });
  trackWrapper.on("click", trackClickHandler);
  switch (type) {
    case "HOR":
      state.startX += RectWidth + ofsset;
      break;
    case "VER":
      state.startY += RectHeight + ofsset;
      break;
    default:
      break;
  }
  return trackItem;
}
function calcRectangleWidthFromLength(value) {
  if (value <= 1000) {
    return 100;
  }
  if (value <= 2000) {
    return 200;
  }
  return HOR_TRACK_WIDTH;
}
function recalcCircleCoords(group, name, type) {
  const svgRect = document.querySelector(`rect[data-name='${name}']`);
  const circleArray = group.find("circle");
  circleArray.forEach((circle, index) => {
    let xCoord = +svgRect.getAttribute("x");
    let yCoord = +svgRect.getAttribute("y");
    if (type === "vertical") {
      xCoord -= 30;
      yCoord += (index + 1) * 25;
    } else if (type === "horizont-top") {
      xCoord += (index + 1) * 25;
      yCoord -= 30;
    } else {
      xCoord += (index + 1) * 25;
      yCoord += 60;
    }
    circle.attr({
      cx: xCoord,
      cy: yCoord,
    });
  });
}
function createLightCircle(
  group,
  x,
  y,
  imagePath,
  type,
  lightsCount,
  id,
  name
) {
  let xCoord = +x;
  let yCoord = +y;
  if (type === "vertical") {
    xCoord -= 30;
    yCoord += lightsCount * 25;
  } else if (type === "vertical-left") {
    xCoord += 60;
    yCoord += lightsCount * 25;
  } else if (type === "horizont-top") {
    xCoord += lightsCount * 25;
    yCoord -= 30;
  } else {
    xCoord += lightsCount * 25;
    yCoord += 60;
  }
  const lightCircleItem = group.circle(40).attr({
    stroke: "#acacac",
    "stroke-width": 2,
    fill: "#000",
    cx: xCoord,
    cy: yCoord,
    class: "circle",
    title: name,
    "data-id": id,
  });
  const pattern = state.defs.pattern(40, 40).attr({
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    patternUnits: "objectBoundingBox",
  });
  lightCircleItem.fill(pattern);
  pattern.image(`https://st.centrsvet.ru/40x40_fit_90/${imagePath}`).attr({
    width: 40,
    height: 40,
    x: 0,
    y: 0,
  });
  lightCircleItem.fill(pattern);
  const nodeCircle = new Tooltip(lightCircleItem.node);
  return nodeCircle;
}
function calculateCanvasWidth(side, trackWidth) {
  const { tracks } = { ...side };
  if (!tracks) {
    return 0;
  }
  if (tracks.length >= 3) {
    return tracks.length * trackWidth + 300;
  }
  if (tracks.length > 1) {
    return 700;
  }
  return 460;
}
function calculateCanvasHeight(side, trackHeight) {
  const { tracks } = { ...side };
  if (!tracks) {
    return 350;
  }
  if (tracks.length >= 2) {
    return tracks.length * trackHeight + 300;
  }
  return 450;
}
function trackClickHandler({ currentTarget }) {
  if (props.showResult) {
    return;
  }

  tracksRemoveActive();
  state.currentTrack = null;
  currentTarget.classList.add("active");

  const {
    dataset: { title, index },
  } = currentTarget;

  setTimeout(() => {
    console.log("state.tracks[title][index]", state.tracks[title][index]);
    state.currentTrack = state.tracks[title][index];
    console.log("state.currentTrack", state.currentTrack);
  }, 200);
  // setTimeout(() => {
  //   const refTotrack = sideProducts.value?.offsetTop;
  //   window.scrollTo({
  //     top: refTotrack,
  //     behavior: "smooth",
  //   });
  // }, 600);
}
function tracksRemoveActive() {
  const tracks = document.querySelectorAll(".g-track-wrapper");
  tracks.forEach((track) => track.classList.remove("active"));
}
function searchTrackLight() {
  if (!relatedSubProducts.value.length) {
    openAllTrackLights();
  } else state.enableRelatedList = true;
}
function openAllTrackLights() {
  console.log("openAllTrackLights", openAllTrackLights);
  state.enableProductList = true;
  state.enableRelatedList = false;
}
function addLightToTrack(subproduct, track = state.currentTrack) {
  const copySubproduct = { ...subproduct };
  const { title, index, name, type } = track;
  const lightId = uuidv4();
  copySubproduct.uuid = lightId;
  const svgRect = document.querySelector(`rect[data-name='${name}']`);
  const xRect = svgRect.getAttribute("x");
  const yRect = svgRect.getAttribute("y");
  const lightsCount = track.track_lights.length + 1;
  const groupByIndex = state[title].findOne(`g[data-index='${index}']`);
  const Lightdimension = copySubproduct.features.dimension
    ? +copySubproduct.features.dimension.value
    : 100;
  if (track.track_remains < Lightdimension) {
    svgRect.classList.add("full");
    state.enableProductList = false;
    state.enableRelatedList = false;
    state.sideError = true;
    copySubproduct.needRemove = true;
  }
  track.track_remains -= Lightdimension;

  if (track.track_remains <= 50) {
    svgRect.classList.add("full");
  } else svgRect.classList.remove("full");
  copySubproduct.groupByIndex = index;
  copySubproduct.xRect = xRect;
  copySubproduct.yRect = yRect;
  copySubproduct.type = type;
  copySubproduct.lightsCount = lightsCount;
  copySubproduct.title = title;
  track.track_lights.push(copySubproduct);

  store.dispatch("products/addSubproduct", copySubproduct);

  createLightCircle(
    groupByIndex,
    xRect,
    yRect,
    copySubproduct.icon_image1,
    type,
    lightsCount,
    lightId,
    copySubproduct.name
  );

  state.enableProductList = false;
  state.enableRelatedList = false;
  store.dispatch("shape/setShapeOnStorage");
}
function handleLightDelete(id, { features }) {
  const { title, index, name, type } = state.currentTrack;
  const svgRect = document.querySelector(`rect[data-name='${name}']`);
  const circleForDelete = document.querySelector(`circle[data-id='${id}'`);
  const groupByIndex = state[title].findOne(`g[data-index='${index}']`);
  const Lightdimension = features.dimension ? +features.dimension.value : 100;
  circleForDelete.remove();
  state.currentTrack.track_remains += Lightdimension;

  store.dispatch("products/removeSubproduct", id);

  state.currentTrack.track_lights = state.currentTrack.track_lights.filter(
    ({ uuid }) => uuid !== id
  );
  recalcCircleCoords(groupByIndex, name, type);
  if (state.currentTrack.track_remains > 150) {
    svgRect.classList.remove("full");
    state.sideError = false;
  }
  store.dispatch("shape/setShapeOnStorage");
}
function closecurrentTrack() {
  state.currentTrack = null;
}
function closeFilters() {
  state.enableProductList = false;
  state.enableRelatedList = false;
}

onMounted(() => {
  initDraw();

  smoothscroll.polyfill();
});
</script>

<template>
  <section
    class="system-visuall d-flex align-items-center justify-content-center"
  />

  <transition name="slide-fade">
    <section class="side-products" ref="sideProducts" v-if="state.currentTrack">
      <header>
        <div class="side-products__top-text d-flex justify-content-between">
          <h2 class="side-products__title">
            {{ state.currentTrack.name }}
          </h2>
          <button class="side-products__close" @click="closecurrentTrack">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 3.44l5.5 5.5 4.97-4.97a.75.75 0 1 1 1.06 1.06L11.06 10l4.97 4.97a.75.75 0 1 1-1.06 1.06L10 11.06l-5.5 5.5-1.06-1.06 5.5-5.5-5.5-5.5L4.5 3.44z"
                fill="#151528"
              />
            </svg>
          </button>
        </div>
        <p v-if="state.currentTrack.insertPower">
          Блок питания на {{ props.powerSupply }} Вт встроен в
          {{ state.currentTrack.name }}
        </p>

        <p>
          Свободно:
          <span :class="{ danger: isTrackFullLength }">
            {{ state.currentTrack.track_remains }}
          </span>
          мм из <b>{{ state.currentTrack.track_length }} мм</b>
        </p>
        <p class="side-products__danger" v-if="isTrackFullLength">
          Достигнуто максимальное кол-во светильников в треке
        </p>
      </header>

      <div class="side-products__wrapper d-flex align-items-start">
        <transition-group
          class="side-products__list d-flex flex-wrap"
          name="slide-left"
          tag="ul"
        >
          <li
            v-for="product in state.currentTrack.track_lights"
            :class="{
              'side-products__item': true,
              for_remove: product.needRemove,
            }"
            @click="handleLightDelete(product.uuid, product)"
            :key="product.uuid"
          >
            <div class="card">
              <img
                :src="product.icon_image1"
                loading="lazy"
                class="img-responsive"
                width="400"
                height="400"
                alt=""
              />
              <h4 class="card__title">
                {{ product.name }}
              </h4>
            </div>
            <svg
              class="side-products__delete"
              width="48px"
              height="48px"
              style="enable-background: new 0 0 512 512"
              fill="#fff"
              viewBox="0 0 512 512"
            >
              <g>
                <g fill="#fff">
                  <line x1="169.449" x2="342.551" y1="169.449" y2="342.551" />
                  <line x1="342.551" x2="169.449" y1="169.449" y2="342.551" />
                </g>
                <g fill="#fff">
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
          </li>
        </transition-group>
        <div class="side-products__add">
          <button
            @click="searchTrackLight()"
            :disabled="isTrackFullLength || powerError"
            class="side-products__button d-flex flex-xl-column align-items-center justify-content-center"
          >
            <span>Добавить светильник</span>
            <span>+</span>
          </button>
          <transition name="slide-left">
            <div v-if="state.enableRelatedList" class="recently-items">
              <h4 class="recently-items__title">Недавно добавленные</h4>
              <ul class="recently-items__list">
                <li :key="item.id" v-for="item in relatedSubProducts">
                  <button
                    @click="addLightToTrack(item)"
                    class="recently-items__button"
                  >
                    <img
                      :src="item.icon_image1"
                      loading="lazy"
                      class="recently-items__image"
                      width="40"
                      height="40"
                    />
                    <span class="recently-items__name">
                      {{ item.name }}
                    </span>
                  </button>
                </li>
              </ul>
              <button
                @click="openAllTrackLights()"
                class="recently-items__button recently-items__button--all"
              >
                <span class="recently-items__name"> Весь список </span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </transition>

  <transition name="fade">
    <div
      class="product-popup"
      @click.self="closeFilters"
      v-if="state.enableProductList"
    >
      <SearchProductsList
        @add-light="addLightToTrack"
        @close-filters="closeFilters"
      />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/styles/scss/variables";
@import "@/styles/scss/mixins";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
// Slide fade
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.35s;
}
.slide-fade-enter-active {
  transition-delay: 0.15s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
// Slide Left
.slide-left-enter-active,
.slide-left-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.45s;
}
.slide-left-enter-active {
  transition-delay: 0.15s;
}
.slide-left-enter,
.slide-left-leave-active {
  transform: translate3d(20%, 0, 0);
  opacity: 0;
}
.side-products {
  padding: 1rem;
  width: 100%;
  margin-bottom: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  &__wrapper {
    width: 100%;
    padding-right: 300px;
    @include media-breakpoint-down(md) {
      padding: 0;
      flex-direction: column;
    }
  }
  &__list {
    padding: 0;
    list-style: none;
  }
  &__item {
    position: relative;
    max-width: 230px;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.11);
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0);
      transition: 0.35s;
    }
    &:hover,
    &.for_remove {
      &::after {
        background-color: rgba(0, 0, 0, 0.36);
      }
      .side-products__delete {
        display: block;
      }
    }
    @include media-breakpoint-down(md) {
      max-width: 30%;
    }
  }
  &__delete {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: none;
  }
  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    background-color: transparent;
    border: 1px solid #fff;
    transition: 0.3;
    &:hover {
      border-color: #000;
    }
  }
  &__add {
    position: relative;
    @include media-breakpoint-down(md) {
      min-height: auto;
      width: 100%;
    }
  }
  &__button {
    @include resetBtnStyle;
    min-height: 210px;
    min-width: 190px;
    padding: 1rem;
    background-color: $light_accent;
    &:disabled {
      cursor: not-allowed;
    }
    @include media-breakpoint-down(md) {
      min-height: auto;
      width: 100%;
      min-width: 100%;
    }
  }
  &__danger {
    color: #dc3545;
  }
}
.card {
  &__title {
    margin-top: 15px;
    padding-left: 10px;
    font-size: 0.775rem;
    @include media-breakpoint-down(md) {
      font-size: 0.675rem;
    }
  }
}
.product-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding-bottom: 50px;
  padding-top: 100px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.36);
  outline: none;
  @include media-breakpoint-down(md) {
    padding-top: 0px;
  }
}
.recently-items {
  position: absolute;
  top: 0;
  left: 220px;
  z-index: 1;
  width: 250px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  &__title {
    padding: 10px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 1px solid #dee2e6;
  }
  &__list {
    padding-left: 10px;
    list-style: none;
    li {
      margin-bottom: 4px;
      :hover {
        background-color: #f8f9fa;
      }
    }
  }
  &__button {
    @include resetBtnStyle;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--all {
      width: 100%;
      justify-content: center;
      text-align: center;
      padding: 0.625rem 0.9375rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 1.5;
      color: #fff;
      background-color: rgb(108, 117, 125);
      border: 1px solid rgb(108, 117, 125);
      .recently-items__name {
        text-align: center;
        font: inherit;
      }
    }
  }
  &__image {
    width: 40%;
  }
  &__name {
    width: 55%;
    font-size: 0.65rem;
    font-weight: 500;
    text-align: left;
  }
  @include media-breakpoint-down(md) {
    top: unset;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.qr-code-img {
  max-width: 250px;
}
.input-group--copy {
  .form-control--copy-link {
    padding-right: 55px;
    &.copied {
      opacity: 0.6;
    }
    &.copied + .btn-copy {
      background-color: #000;
      svg {
        fill: #fff;
      }
    }
  }
  .btn-copy {
    position: absolute;
    right: 2px;
    top: 2px;
    bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: #fff;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>

<style lang="scss">
@import "@/styles/scss/variables";

.system-visuall {
  min-height: 445px;
}
.system-visuall {
  svg {
    max-width: 100%;
    height: auto;
    g {
      .g-track {
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          fill: #000;
        }
        &.active {
          fill: #000;
        }
      }
      &.active .g-track {
        fill: #000;
      }
      &.active .full,
      .g-track.full {
        fill: $danger;
      }
    }
    circle {
      transition: all 0.4s;
      cursor: pointer;
    }
  }
}
@media print {
  html,
  body {
    height: 297mm;
    width: 210mm;
  }
  .noprint {
    display: none;
  }
  body {
    margin: 20mm 10mm 20mm 20mm;
  }
  .main-nav {
    opacity: 0;
  }
  .container {
    width: 100%;
    max-width: 100%;
  }
  .form-group__text--power {
    max-width: 165px;
  }
}
</style>
