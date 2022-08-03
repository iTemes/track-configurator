<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const sidesFromStore = computed(() => store.state.shape.sides);
const systemMounting = computed(() => store.state.system.systemParams.mounting);

const totalTracks = computed(() => store.getters["shape/totalTracks"]);
const totalContainerForTracks = computed(
  () => store.getters["shape/totalContainerForTracks"]
);
const totalConnectors = computed(() => store.getters["shape/totalConnectors"]);
const totalMetalicConnectors = computed(
  () => store.getters["shape/totalMetalicConnectors"]
);

const totalSuspension = computed(() => store.getters["shape/totalSuspension"]);
// TODO
const corners = 0;
const flexConnectors = 0;
const stubs = 0;
const isPowerAdaptor = false;
const subproducts = [];
// END TODO
defineProps({
  show: {
    type: [Boolean, String],
    default: false,
  },
});

const calcTrackCountOnSide = (side) => {
  const sideTrackCount = +(side.side_total_length / 2500).toFixed(1);
  return sideTrackCount;
};
</script>
<template>
  <section v-if="show" class="form-group result-table">
    <h3 class="form-head mb-5">
      {{ t("resultTable.result") }}
    </h3>
    <div class="table-responsive-md">
      <table class="table">
        <thead>
          <tr>
            <th class="table__title" scope="col">
              {{ t("resultTable.name") }}
            </th>
            <th class="table__title" scope="col">
              {{ t("resultTable.count") }}
            </th>
            <th class="table__title" scope="col">
              {{ t("resultTable.length") }}
            </th>
            <th class="table__title" scope="col">
              {{ t("resultTable.sideLength") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template :key="side.name" v-for="side in sidesFromStore">
            <tr class="table__headline">
              <th colspan="4">
                {{ t(`message.${side.title}`) }}
              </th>
            </tr>
            <tr v-show="side.tracks.length">
              <th scope="row">
                {{ t("message.track") }} -
                {{ t(`message.${systemMounting}`) }}
              </th>
              <td>
                {{ calcTrackCountOnSide(side) }}
                {{ t("message.items", calcTrackCountOnSide(side)) }}
              </td>
              <td>2500 {{ t("message.mm") }}</td>
              <td>{{ side.side_total_length }} {{ t("message.mm") }}</td>
            </tr>
          </template>
          <template v-if="totalTracks">
            <tr class="table__headline">
              <th colspan="4">{{ t("message.total") }}:</th>
            </tr>
            <tr>
              <th>
                {{ t("message.track") }} -
                {{ t(`message.${systemMounting}`) }}
              </th>

              <td>
                {{ totalTracks }}
                {{ t("message.items", totalTracks) }}
              </td>
              <td colspan="2" />
            </tr>
          </template>
          <tr class="table__headline">
            <th colspan="4">
              {{ t("message.accessories") }}
            </th>
          </tr>
          <tr v-if="totalContainerForTracks">
            <td>{{ t("message.trackCanal") }}:</td>
            <td colspan="4">
              {{ totalContainerForTracks }}
              {{ t("message.items", totalContainerForTracks) }}
            </td>
          </tr>
          <tr v-if="totalSuspension">
            <td>{{ t("message.suspensionsForTrack") }}:</td>
            <td colspan="4">
              {{ totalSuspension }} {{ t("message.items", totalSuspension) }}
            </td>
          </tr>
          <tr v-if="totalSuspension">
            <td>{{ t("message.suspensionElement") }}:</td>
            <td colspan="4">
              {{ totalSuspension }} {{ t("message.items", totalSuspension) }}
            </td>
          </tr>
          <tr v-if="corners">
            <td>{{ t("message.cornerConnectors") }}:</td>
            <td colspan="4">{{ corners }} {{ t("message.items", corners) }}</td>
          </tr>
          <tr v-if="corners">
            <td>{{ t("message.flexConnectors") }}:</td>
            <td colspan="4">
              {{ flexConnectors }} {{ t("message.items", flexConnectors) }}
            </td>
          </tr>
          <tr v-if="totalConnectors">
            <td>{{ t("message.coupler") }}:</td>
            <td colspan="4">
              {{ totalConnectors }} {{ t("message.items", totalConnectors) }}
            </td>
          </tr>
          <tr v-if="totalMetalicConnectors">
            <td>{{ t("message.metalicCoupler") }}:</td>
            <td colspan="4">
              {{ totalMetalicConnectors }}
              {{ t("message.items", totalMetalicConnectors) }}
            </td>
          </tr>
          <tr v-if="stubs">
            <td>{{ t("message.endCaps") }}:</td>
            <td colspan="4">{{ stubs }} {{ t("message.items", stubs) }}</td>
          </tr>
          <tr>
            <td>{{ t("message.supply") }}</td>
            <td colspan="4">1 {{ t("message.items", 1) }}</td>
          </tr>
          <tr v-if="isSmartLight">
            <td>INF SMART LIGHT</td>
            <td colspan="4">1{{ t("message.items", 1) }}</td>
          </tr>
          <tr v-if="isPowerAdaptor">
            <td>{{ t("message.externalAdapter") }}</td>
            <td colspan="4">1 {{ t("message.items", 1) }}</td>
          </tr>
          <tr class="table__headline" v-if="subproducts.length">
            <th colspan="4">
              {{ t("message.luminaries") }}
            </th>
          </tr>
          <template v-if="subproducts.length">
            <tr :key="subproduct.id" v-for="subproduct in subproducts">
              <td>{{ subproduct.name }}</td>
              <td colspan="4">
                {{ subproduct.count }}
                {{ t("message.items", subproduct.count) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.result-table {
  padding-bottom: 200px;
}
</style>
