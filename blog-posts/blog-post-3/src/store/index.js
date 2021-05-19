import { createStore } from "vuex";
import authModule from "./authModule";
import dydbModule from "./dydbModule";

export default createStore({
  modules: { dydbModule, authModule },
});
