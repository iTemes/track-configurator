import { UPDATE_SHAPE } from "../mutation-types";

const state = {
  shape: null,
  sides: null,
  total_length: 0,
  total_tracks: 0,
};

// getters
const getters = {};

// mutations
const mutations = {
  [UPDATE_SHAPE](state, shape) {
    state.shape = shape;
  },
};

// actions
const actions = {
  updateShape({ commit }, value) {
    commit(UPDATE_SHAPE, value);
  },
  resetShape({ commit }) {
    commit(UPDATE_SHAPE, null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
