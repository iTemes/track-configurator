import { createStore } from "vuex";

import system from "./modules/system";
import shape from "./modules/shape";

export default createStore({
  modules: {
    system,
    shape,
  },
});
