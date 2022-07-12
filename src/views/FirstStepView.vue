<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import PageFooter from "./general/PageFooter/PageFooter.vue";
import FormFieldSet from "@/components/Form/FormFieldSet/FormFieldSet.vue";

import { START_IMAGE_PATH } from "@/utils/constans";

const store = useStore();

const formFields = [
  {
    model: "mounting",
    inputsGroup: [
      {
        type: "radio",
        name: "system-mounting",
        id: "recessed-mounting",
        value: "recessed",
      },
      {
        type: "radio",
        name: "system-mounting",
        id: "surface-mounting",
        value: "surface",
      },
      {
        type: "radio",
        name: "system-mounting",
        id: "suspended-mounting",
        value: "suspended",
      },
      {
        type: "radio",
        name: "system-mounting",
        id: "stretch-ceiling-mounting",
        value: "stretch-ceiling",
      },
    ],
  },
  {
    model: "color",
    inputsGroup: [
      {
        type: "radio",
        name: "system-color",
        id: "black-system-color",
        value: "black",
      },
      {
        type: "radio",
        name: "system-color",
        id: "white-system-color",
        value: "white",
      },
    ],
  },
  {
    model: "controlPlace",
    inputsGroup: [
      {
        type: "radio",
        name: "control_place",
        id: "external-control",
        value: "external-control",
      },
      {
        type: "radio",
        name: "control_place",
        id: "integrated-control",
        value: "integrated-control",
      },
    ],
  },
];

const colorFromStore = computed(() => store.state.system.systemParams.color);
const mountingFromStore = computed(
  () => store.state.system.systemParams.mounting
);

const previewPhoto = computed(() => {
  if (!mountingFromStore.value || !colorFromStore.value) return false;
  return `${START_IMAGE_PATH}/${mountingFromStore.value}_${colorFromStore.value}.jpg`;
});

const previewSchema = computed(() => {
  if (!mountingFromStore.value) return false;
  return `${START_IMAGE_PATH}/${mountingFromStore.value}_shema.svg`;
});
</script>

<template>
  <PageTemplateVue>
    <template #main>
      <div class="container mt-5">
        <form ref="stepForm">
          <FormFieldSet
            v-for="field in formFields"
            :key="field.model"
            :title="field.model"
            :inputsGroup="field.inputsGroup"
            :modelValue="field.model"
          />
        </form>

        <div class="result-container">
          <div class="row">
            <div class="col col-md-6" v-if="previewPhoto">
              <img :src="previewPhoto" alt="" />
            </div>
            <div class="col col-md-4" v-if="previewSchema">
              <img :src="previewSchema" alt="" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <PageFooter link="/secondStep" />
    </template>
  </PageTemplateVue>
</template>
