import { createStore } from "vuex";

import system from "./modules/system";
import shape from "./modules/shape";
import accsessories from "./modules/accsessories";

export default createStore({
  modules: {
    system,
    shape,
    accsessories,
  },
});
