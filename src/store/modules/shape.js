import { UPDATE_SHAPE, UPDATE_SIDES, UPDATE_LENGTH } from "../mutation-types";

const state = {
  shape: null,
  sides: null,
  totalLength: 0,
  totalTracks: 0,
};

// getters
const getters = {};

// mutations
const mutations = {
  [UPDATE_SHAPE](state, shape) {
    state.shape = shape;
  },
  [UPDATE_SIDES](state, sides) {
    state.sides = sides;
  },
  [UPDATE_LENGTH](state, length) {
    state.totalLength = length;
  },
};

// actions
const actions = {
  updateShape({ commit }, value) {
    commit(UPDATE_SHAPE, value);
  },
  updateSides({ commit }, value) {
    commit(UPDATE_SIDES, value);
  },
  updateLength({ commit }, value) {
    commit(UPDATE_LENGTH, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
