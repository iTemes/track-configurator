import { UPDATE_SHAPE, UPDATE_SIDES, UPDATE_LENGTH } from "../mutation-types";

import {
  TRACK_SIZE,
  STRETCH_CEILING,
  RECESSED,
  SUSPENDED,
} from "@/utils/constans";

const METTALIC_CONNECTORS_BY_SIDE = 4;
const SUSPENSION_ON_TRACK = 2;

const state = {
  shape: null,
  sides: null,
  totalLength: 0,
};

// getters
const getters = {
  totalTracks(state) {
    const tracksCount = Math.ceil(state.totalLength / TRACK_SIZE);
    return tracksCount;
  },
  totalContainerForTracks(state, getters, rootState) {
    if (rootState.system.systemParams.mounting === STRETCH_CEILING) {
      return getters.totalTracks;
    }
    return 0;
  },
  totalConnectors(state) {
    if (!state.shape) {
      return 0;
    }

    return Object.values(state.sides).reduce(
      (acc, { side_connectors }) => (acc += side_connectors),
      0
    );
  },
  totalMetalicConnectors(state, getters, rootState) {
    if (!state.shape) {
      return 0;
    }
    if (rootState.system.systemParams.mounting !== RECESSED) {
      return (getters.totalConnectors * METTALIC_CONNECTORS_BY_SIDE) / 2;
    }

    return getters.totalConnectors * METTALIC_CONNECTORS_BY_SIDE;
  },
  totalSuspension(state, getters, rootState) {
    if (rootState.system.systemParams.mounting !== SUSPENDED) {
      return (getters.totalTracks * SUSPENSION_ON_TRACK) / 2;
    }
    return 0;
  },
};

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
    const payload = value < 0 ? 0 : value;
    commit(UPDATE_LENGTH, payload);
  },
  setShapeOnStorage({ state }) {
    const stringifySides = JSON.stringify(state.sides);
    const stringifyShape = JSON.stringify(state.shape);
    sessionStorage.setItem("sides", stringifySides);
    sessionStorage.setItem("shape", stringifyShape);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
