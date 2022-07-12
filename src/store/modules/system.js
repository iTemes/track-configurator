import {
  UPDATE_COLOR,
  UPDATE_MOUTING,
  UPDATE_CONTROL_PLACE,
  UPDATE_SYSTEM_PARAMETER,
} from "../mutation-types";

const state = {
  systemParams: {
    color: null,
    mounting: null,
    controlPlace: null,
  },
};

// getters
const getters = {};

// mutations
const mutations = {
  [UPDATE_COLOR](state, color) {
    state.color = color;
  },
  [UPDATE_MOUTING](state, mouting) {
    state.mouting = mouting;
  },
  [UPDATE_CONTROL_PLACE](state, place) {
    state.controlPlace = place;
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
  updateSystemParameter({ commit }, payload) {
    commit(UPDATE_SYSTEM_PARAMETER, payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
