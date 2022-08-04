<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

import smoothscroll from "smoothscroll-polyfill";
import { Modal } from "bootstrap";

import { POWER_SUPPLY, MIN_SUPPLY } from "@/utils/constans";
import { getMockQrCodeUrlFromServer } from "@/utils/mocks";

import TableResult from "@/components/TableResult/TableResult.vue";
import PageTemplateVue from "./general/PageTemplate/PageTemplate.vue";
import PageFooter from "./general/PageFooter/PageFooter.vue";
import DrawTracks from "@/components/DrawTracks/DrawTracks.vue";

const store = useStore();
const state = reactive({
  qrCode: null,
  keyTolink: null,
  configKeyFromHash: null,
  conFigError: false,
  powerError: false,
  showResult: false,
  sharedModal: null,
  sharedEmail: "",
  postConfigObject: null,
});

const isNoSides = computed(() => !store.state.shape.sides);
const totalTracks = computed(() => store.getters["shape/totalTracks"]);
const controlPlaceFromStore = computed(
  () => store.state.system.systemParams.controlPlace
);
const mountingFromStore = computed(
  () => store.state.system.systemParams.mounting
);
const shapeFromStore = computed(() => store.state.shape.shape);
const sidesFromStore = computed(() => store.state.shape.sides);
const accsessoriesFromStore = computed(() => store.state.shape.accsessories);
const colorFromStore = computed(() => store.state.system.systemParams.color);
const addedSubproducts = computed(() => store.state.products.addedSubproducts);

const systemPower = computed(() => {
  let power = 0;
  if (!addedSubproducts.value.length) {
    return power;
  }
  addedSubproducts.value.forEach(({ features }) => {
    if (!features) return;
    power += Number(features.power.value);
  });
  return power;
});
const powerSupply = computed(() => {
  let powerSupValue = MIN_SUPPLY;
  let powerSupList = POWER_SUPPLY[controlPlaceFromStore.value];

  const systemColor = colorFromStore.value;
  if (!powerSupList) {
    return powerSupValue;
  }
  if (controlPlaceFromStore.value !== "external-control") {
    powerSupList = powerSupList.filter((item) => item.color === systemColor);
  }

  for (const supply of powerSupList) {
    if (systemPower.value < supply.value) {
      powerSupValue = supply.value;
      store.dispatch("system/updatePowerSupply", supply);
      return powerSupValue;
    }
  }

  return powerSupValue;
});
const nextStep = computed(
  () => addedSubproducts.value.length && !state.powerError
);
const configurationUrl = computed(() => {
  const locationKey = state.keyTolink || state.configKeyFromHash;
  return `/thirdStep?config_key=${locationKey}`;
});

const tableResultRef = ref(null);
const sharedEmailInput = ref(null);
const sharedModal = ref(null);

function finishConfig() {
  state.showResult = true;

  setTimeout(() => {
    const refToTable = tableResultRef?.value?.resultTable?.offsetTop;

    window.scrollTo({
      top: refToTable,
      behavior: "smooth",
    });
  }, 600);

  // TODO POST CONFIG TO SERVER
  const configDetails = {
    control_place: controlPlaceFromStore.value,
    system_color: colorFromStore.value,
    system_mounting: mountingFromStore.value,
  };
  const appData = {
    accsessories: accsessoriesFromStore.value,
    shape: shapeFromStore.value,
    sides: sidesFromStore.value,
    configDetails,
  };

  state.postConfigObject = { ...appData };

  const response = postConfigToServer(state.postConfigObject);
  state.qrCode = response.qrcode_url;
  state.keyTolink = response.config_key;
}
function printTable() {
  setTimeout(() => {
    window.print();
  }, 450);
}
function shareConfig() {
  state.sharedModal.show();
}
function checkValidityInput(evt) {
  evt.target.setCustomValidity("");
}
function postMail(obj) {
  console.log("obj", obj);
}
function postConfigToServer(configObject) {
  console.log("Post config", configObject);
  // TODO MOCK

  return {
    qrcode_url: getMockQrCodeUrlFromServer(),
    config_key: "randomhashkey",
  };
}
function sendEmail() {
  const validity = sharedEmailInput.value.checkValidity();
  if (validity) {
    const putEmailObject = {
      config_key: configurationUrl,
      target_email: state.sharedEmail,
      object_configurator: state.postConfigObject,
    };

    postMail(putEmailObject);

    state.sharedModal.hide();
  } else {
    sharedEmailInput.value.focus();
    sharedEmailInput.value.setCustomValidity(
      "Неправильный формат email адреса"
    );
  }
}
async function buildOrder(evt) {
  evt.preventDefault();
  alert("Формирование корзины");
}

onMounted(() => {
  smoothscroll.polyfill();

  state.sharedModal = new Modal(sharedModal.value);
});
</script>

<template>
  <PageTemplateVue>
    <template #main>
      <div class="container mt-5">
        <h1 class="visually-hidden">
          Третий шаг - визуализация и добавление светильников
        </h1>

        <div class="form-group">
          <h3 class="form-head">Конфигурация светильников системы</h3>
          <div v-if="state.conFigError">
            <p class="form-group__text">
              Ссылка на конфигурацию больше не действительна
            </p>
            <router-link to="/" exact-path>
              Вернуться к первому шагу
            </router-link>
          </div>
          <div v-else class="d-flex align-items-center justify-content-between">
            <p
              class="form-group__text noprint"
              v-if="isNoSides && !totalTracks"
            >
              Вы не добавили треки, вернитесь на второй шаг.
            </p>
            <p v-else class="form-group__text noprint">
              Нажмите на нужный трек, чтобы добавить светильники.
            </p>

            <p class="form-group__text form-group__text--power">
              Мощность системы:
              <span :class="{ danger: state.powerError }">{{
                systemPower
              }}</span>
              / {{ powerSupply }} Вт
            </p>
          </div>
        </div>

        <DrawTracks :showResult="state.showResult" :powerSupply="powerSupply" />

        <TableResult ref="tableResultRef" :show="state.showResult" />

        <div v-if="false && qrCode">
          <img
            class="qr-code-img"
            width="250"
            height="250"
            :src="qrCode"
            alt="qr"
          />
        </div>

        <!-- Modal -->
        <div
          ref="sharedModal"
          class="modal fade"
          id="sharedModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Поделиться конфигурацией
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <form @submit.prevent>
                <div class="modal-body">
                  <label for="basic-url" class="form-label">Ссылка:</label>
                  <div class="input-group input-group--copy mb-3">
                    <input
                      ref="copyLink"
                      class="form-control form-control--copy-link"
                      type="text"
                      aria-label="Disabled input example"
                      disabled
                      readonly
                      v-model="configurationUrl"
                    />
                    <button
                      type="button"
                      class="btn btn-default btn-copy js-tooltip js-copy"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :data-copy="configurationUrl"
                      @click="copyToClipBoard"
                      title="Copy to clipboard"
                    >
                      <svg
                        class="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <label for="basic-url" class="form-label"
                    >Отправить на почту:</label
                  >
                  <div class="form-floating mb-3">
                    <input
                      @input="checkValidityInput"
                      ref="sharedEmailInput"
                      v-model="state.sharedEmail"
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      required
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email:</label>
                  </div>
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
                    class="btn btn-dark"
                    type="submit"
                    @click="sendEmail($event)"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <PageFooter
        :enable-next="nextStep"
        :reset-step-enalbe="false"
        @push-next="finishConfig"
        :finished="state.showResult"
      >
        <template #content>
          <div v-if="state.showResult">
            <button
              @click.prevent="printTable"
              class="btn btn-outline-dark mx-2"
            >
              Печать
            </button>
            <button
              @click.prevent="shareConfig"
              class="btn btn-outline-dark mx-2"
            >
              Поделиться
            </button>
            <button @click.prevent="buildOrder" class="btn btn-dark mx-2">
              Заказать
            </button>
          </div>
        </template>
      </PageFooter>
    </template>
  </PageTemplateVue>
</template>
