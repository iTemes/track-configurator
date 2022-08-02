<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import ShapeChoicerVue from "@/components/ShapeChoicer/ShapeChoicer.vue";
import TrackBoard from "@/components/TrackBoard/TrackBoard.vue";

import { SHAPE_SQUARE, SUSPENDED } from "@/utils/constans";

const store = useStore();

const systemMounting = computed(() => store.state.system.systemParams.mounting);
const isSuspensionSystem = computed(() => systemMounting.value === SUSPENDED);
const suspensionType = computed(
  () => store.state.system.systemParams.suspensionType
);
const shape = computed(() => store.state.shape.shape);
const sidesFromStore = computed(() => store.state.shape.sides);

const sidesForTabs = computed(() => {
  if (shape.value === SHAPE_SQUARE) {
    const sidesForSqare = Object.keys(sidesFromStore.value)
      .filter((side) => {
        return (
          sidesFromStore.value[side].title === "sideC" ||
          sidesFromStore.value[side].title === "sideD"
        );
      })
      .reduce((res, key) => {
        res[key] = sidesFromStore.value[key];
        return res;
      }, {});
    return sidesForSqare;
  }

  return sidesFromStore.value;
});

const isAddTrackEnable = computed(() => {
  if (isSuspensionSystem.value) {
    return shape.value && suspensionType.value;
  }
  return shape.value;
});
</script>
<template>
  <PageTemplateVue>
    <template #main>
      <div class="container container--main">
        <div v-if="systemMounting">
          <ShapeChoicerVue />
          <TrackBoard
            :sidesForTabs="sidesForTabs"
            :isAddTrackEnable="isAddTrackEnable"
          />
        </div>
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

<style lang="scss" scoped></style>
