import { UPDATE_ACCESSORY_PARAMETER } from "../mutation-types";

const state = {
  corners: 0,
  connectors: 0,
  stubs: 0,
};

// getters
const getters = {};

// mutations
const mutations = {
  [UPDATE_ACCESSORY_PARAMETER](state, { parameter, value }) {
    if (Object.prototype.hasOwnProperty.call(state, parameter)) {
      state[parameter] = value;
    }
  },
};

// actions
const actions = {
  setAccsessoriesToStorage({ state }) {
    const accsessoriesObject = {
      total_container_for_tracks: state.totalContainerForTracks,
      total_suspension: state.totalSuspension,
      corners: state.corners,
      total_connectors: state.totalConnectors,
      flex_connectors: state.flexConnectors,
      total_metalic_connectors: state.totalMetalicConnectors,
      stubs: state.stubs,
      is_smart_light: state.isSmartLight,
      is_power_adaptor: state.isPowerAdaptor,
    };
    const stringifyAccsessories = JSON.stringify(accsessoriesObject);
    sessionStorage.setItem("accessories", stringifyAccsessories);
  },
  resetAccsessories({ state }) {
    state.containerForTracks = 0;
    state.corners = 0;
    state.flexConnectors = 0;
    state.connectors = 0;
    state.metalicConnectors = 0;
    state.stubs = 0;
    state.smartLight = 0;
    state.powerAdaptor = 0;
  },
  updateAccessoriesParameter({ commit }, payload) {
    commit(UPDATE_ACCESSORY_PARAMETER, payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
