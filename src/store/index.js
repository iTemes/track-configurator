import { createStore } from "vuex";

import system from "./modules/system";
import shape from "./modules/shape";
import products from "./modules/products";

export default createStore({
  modules: {
    system,
    shape,
    products,
  },
});
