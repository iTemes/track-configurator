import {
  UPDATE_COLOR,
  UPDATE_MOUTING,
  UPDATE_CONTROL_PLACE,
  UPDATE_SYSTEM_PARAMETER,
  UPDATE_SUSPENSION_TYPE,
} from "../mutation-types";

import { EXTERNAL_CONTROL } from "@/utils/constans";

const state = {
  systemParams: {
    color: null,
    mounting: null,
    controlPlace: null,
    suspensionType: null,
  },
};

// getters
const getters = {
  isPowerAdaptor(state) {
    return state.systemParams.controlPlace === EXTERNAL_CONTROL ? 1 : 0;
  },
};

// mutations
const mutations = {
  [UPDATE_COLOR](state, color) {
    state.systemParams.color = color;
  },
  [UPDATE_MOUTING](state, mounting) {
    state.systemParams.mounting = mounting;
  },
  [UPDATE_CONTROL_PLACE](state, place) {
    state.systemParams.controlPlace = place;
  },
  [UPDATE_SUSPENSION_TYPE](state, type) {
    state.systemParams.suspensionType = type;
  },

  [UPDATE_SYSTEM_PARAMETER](state, { parameter, value }) {
    if (Object.prototype.hasOwnProperty.call(state.systemParams, parameter)) {
      state.systemParams[parameter] = value;
    }
  },
};

// actions
const actions = {
  updateColor({ commit }, value) {
    commit(UPDATE_COLOR, value);
  },
  updateMounting({ commit }, value) {
    commit(UPDATE_MOUTING, value);
  },
  updateControlPlace({ commit }, value) {
    commit(UPDATE_CONTROL_PLACE, value);
  },
  updateSyspensionType({ commit }, value) {
    commit(UPDATE_SUSPENSION_TYPE, value);
  },
  updateSystemParameter({ commit }, payload) {
    commit(UPDATE_SYSTEM_PARAMETER, payload);
  },
  resetSystemParams({ dispatch }) {
    dispatch("updateColor", null);
    dispatch("updateMounting", null);
    dispatch("updateControlPlace", null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
