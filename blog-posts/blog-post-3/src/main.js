import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

// References:

// Loading the Amplify Cognito configuration file
// https://docs.amplify.aws/lib/auth/start/q/platform/js
