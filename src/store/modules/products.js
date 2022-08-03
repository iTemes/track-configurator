import {
  UPDATE_PRODUCTS,
  UPDATE_LOADING,
  UPDATE_ERROR,
  ADD_SUBPRODUCT,
  REMOVE_SUBPRODUCT,
} from "../mutation-types";

import fetchProductsList from "@/utils/mocks";

const state = {
  loading: false,
  isError: false,
  productList: [],
  addedSubproducts: [],
};

// getters
const getters = {};

// mutations
const mutations = {
  [UPDATE_PRODUCTS](state, products) {
    state.productList = products;
  },
  [UPDATE_LOADING](state, boolean) {
    state.loading = boolean;
  },
  [UPDATE_ERROR](state, boolean) {
    state.isError = boolean;
  },
  [ADD_SUBPRODUCT](state, subproduct) {
    state.addedSubproducts.push(subproduct);
  },
  [REMOVE_SUBPRODUCT](state, id) {
    state.addedSubproducts = state.addedSubproducts.filter(
      ({ uuid }) => uuid !== id
    );
  },
};

// actions
const actions = {
  async getProducts({ commit }) {
    commit("UPDATE_LOADING", true);
    commit("UPDATE_ERROR", false);
    try {
      const results = await fetchProductsList();
      commit("UPDATE_PRODUCTS", results);
    } catch (error) {
      commit("UPDATE_ERROR", true);
    } finally {
      commit("UPDATE_LOADING", false);
    }
  },
  addSubproduct({ commit }, subproduct) {
    commit("ADD_SUBPRODUCT", subproduct);
  },
  removeSubproduct({ commit }, id) {
    commit("REMOVE_SUBPRODUCT", id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
