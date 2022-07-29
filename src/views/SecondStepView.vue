<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import ShapeChoiserVue from "@/components/ShapeChoiser/ShapeChoiser.vue";

const store = useStore();
const systemMounting = computed(() => store.state.system.systemParams.mounting);
</script>
<template>
  <PageTemplateVue>
    <template #main>
      <div class="container container--main">
        <div v-if="systemMounting">
          <ShapeChoiserVue />
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
