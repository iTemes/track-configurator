<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import PageFooter from "./general/PageFooter/PageFooter.vue";
import ShapeChoicerVue from "@/components/ShapeChoicer/ShapeChoicer.vue";
import TrackBoard from "@/components/TrackBoard/TrackBoard.vue";
import TableResult from "@/components/TableResult/TableResult.vue";

import { SHAPE_SQUARE, SUSPENDED } from "@/utils/constans";

const router = useRouter();
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
    //if SHAPE_SQUARE make 2 tabs to mirror
    const sidesForSqare = Object.keys(sidesFromStore.value)
      .filter((side) => {
        return (
          sidesFromStore.value[side].title !== "sideC" &&
          sidesFromStore.value[side].title !== "sideD"
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

const nextStep = computed(() => {
  if (!sidesForTabs.value) {
    return false;
  }
  return Object.entries(sidesForTabs.value).every(
    ([, value]) => value.side_total_tracks
  );
});

const resetStep = () => {
  const sidesKeys = Object.keys(sidesFromStore.value);
  console.log("sidesKeys", sidesKeys);
  sidesKeys.forEach((side) => {
    sidesFromStore.value[side].tracks = [];
    sidesFromStore.value[side].side_total_length = 0;
    sidesFromStore.value[side].side_total_tracks = 0;
  });

  store.dispatch("shape/updateSides", null);
  store.dispatch("shape/updateShape", null);
  store.dispatch("shape/updateLength", 0);

  store.dispatch("shape/setShapeOnStorage");
};

const pushNext = () => {
  store.dispatch("shape/setShapeOnStorage");
  store.dispatch("shape/setAccsessoriesToStorage");
  router.push("/thirdstep");
};
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

        <TableResult :show="isAddTrackEnable" />
      </div>
    </template>
    <template #footer>
      <PageFooter
        :enable-next="nextStep"
        @reset-step="resetStep"
        @push-next="pushNext"
      />
    </template>
  </PageTemplateVue>
</template>

<style lang="scss" scoped></style>
