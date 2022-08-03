<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import PageFooter from "./general/PageFooter/PageFooter.vue";
import FormFieldSet from "@/components/Form/FormFieldSet/FormFieldSet.vue";

import { START_IMAGE_PATH } from "@/utils/constans";

const router = useRouter();
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

const systemColor = computed(() => store.state.system.systemParams.color);
const systemMounting = computed(() => store.state.system.systemParams.mounting);
const systemControlPlace = computed(
  () => store.state.system.systemParams.mounting
);

const previewPhoto = computed(() => {
  if (!systemMounting.value || !systemColor.value) return false;
  return `${START_IMAGE_PATH}/${systemMounting.value}_${systemColor.value}.jpg`;
});

const previewSchema = computed(() => {
  if (!systemMounting.value) return false;
  return `${START_IMAGE_PATH}/${systemMounting.value}_shema.svg`;
});

const nextStep = computed(() => {
  return systemControlPlace.value && systemMounting.value && systemColor.value;
});

const resetStep = () => store.dispatch("system/resetSystemParams");
const pushNext = () => router.push("/secondStep");
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
      <PageFooter
        :enable-next="nextStep"
        @reset-step="resetStep"
        @push-next="pushNext"
        link="/secondStep"
      />
    </template>
  </PageTemplateVue>
</template>
