import {
  UPDATE_SHAPE,
  UPDATE_SIDES,
  UPDATE_LENGTH,
  UPDATE_STUBS,
  UPDATE_CORNERS,
} from "../mutation-types";

import {
  SHAPE,
  TRACK_SIZE,
  STRETCH_CEILING,
  RECESSED,
  SUSPENDED,
} from "@/utils/constans";

const METTALIC_CONNECTORS_BY_SIDE = 4;
const SUSPENSION_ON_TRACK = 2;
const METTALIC_COEF = 2;
const SQUARE_CORNERS = 4;
const ADAPTER_CONNECT = 1;

const state = {
  shape: null,
  sides: null,
  totalLength: 0,
  corners: 0,
  stubs: 0,
  isSmartLight: false,
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
      return (
        (getters.totalConnectors * METTALIC_CONNECTORS_BY_SIDE) / METTALIC_COEF
      );
    }

    return getters.totalConnectors * METTALIC_CONNECTORS_BY_SIDE;
  },
  totalSuspension(state, getters, rootState) {
    if (rootState.system.systemParams.mounting === SUSPENDED) {
      return getters.totalTracks * SUSPENSION_ON_TRACK;
    }
    return 0;
  },
  flexConnectors(state) {
    // exlude one connector by adapter
    return state.corners < SQUARE_CORNERS
      ? state.corners
      : state.corners - ADAPTER_CONNECT;
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
  [UPDATE_STUBS](state, count) {
    state.stubs = count;
  },
  [UPDATE_CORNERS](state, count) {
    state.corners = count;
  },
};

// actions
const actions = {
  updateShape({ commit }, value) {
    const { corners, sides, stubs } = SHAPE[value];
    commit(UPDATE_STUBS, stubs);
    commit(UPDATE_CORNERS, corners);
    commit(UPDATE_SIDES, sides);
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
  setAccsessoriesToStorage({ state, getters, rootGetters }) {
    console.log("rootGetters", rootGetters);
    const accsessoriesObject = {
      total_container_for_tracks: getters.totalContainerForTracks,
      total_suspension: getters.totalSuspension,
      corners: state.corners,
      total_connectors: getters.totalConnectors,
      flex_connectors: getters.flexConnectors,
      total_metalic_connectors: getters.totalMetalicConnectors,
      stubs: state.stubs,
      is_smart_light: state.isSmartLight,
      is_power_adaptor: rootGetters["system/isPowerAdaptor"],
    };
    console.log("accsessoriesObject", accsessoriesObject);
    const stringifyAccsessories = JSON.stringify(accsessoriesObject);
    sessionStorage.setItem("accessories", stringifyAccsessories);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
