<template>
  <div id="root" class="border border-info p-2">
    <p><i>TheAuthInfo.vue</i></p>
    {{signOutProcess}}
    <div v-if="unauthenticated">
      Unauthenticated...
    </div>
    <div v-else-if="loading">
      Loading...
    </div>
    <div v-else-if="authenticated">
      <p><u>Authenticated user information</u></p>
      <p>Username: {{ auth.response.username }}</p>
      <p>
        Access level(s):
        <span
          v-if="
            !auth.response.signInUserSession.idToken.payload['cognito:groups']
          "
          >None</span
        >
        <span>{{
          auth.response.signInUserSession.idToken.payload["cognito:groups"]
        }}</span>
      </p>
      <p>
        Auth time:
        {{
          convertTime(auth.response.signInUserSession.idToken.payload.auth_time)
        }}
      </p>
      <p>
        Exp:
        {{ convertTime(auth.response.signInUserSession.idToken.payload.exp) }}
      </p>
      <p>Account email: {{ auth.response.attributes.email }}</p>
    </div>
    <div v-else-if="error">
      {{
        signInProcess.errorData || auth.errorData || signOutProcess.errorData
      }}
    </div>
    <div v-else>{{ auth.response || signInProcess.response }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "TheAuthInfo",
  props: {
    auth: { type: Object, required: true },
    signInProcess: { type: Object, required: true },
    signOutProcess: { type: Object, required: true },
  },
  computed: {
    unauthenticated() {
      if (
        this.signInProcess.status === "idle" &&
        this.auth.status === "idle" &&
        (this.signOutProcess.status === "idle" ||
          this.signOutProcess.status === "success")
      ) {
        return true;
      } else return false;
    },
    loading() {
      if (
        this.signInProcess.status === "waiting" ||
        this.auth.status === "waiting" ||
        this.signOutProcess === "waiting"
      ) {
        return true;
      } else return false;
    },
    authenticated() {
      if (
        this.signInProcess.status === "success" &&
        this.auth.status === "success"
      ) {
        return true;
      } else return false;
    },
    error() {
      if (
        this.signInProcess.error ||
        this.auth.error ||
        this.signOutProcess.error
      ) {
        return true;
      } else return false;
    },
  },
  methods: {
    convertTime(unixTime) {
      return moment.unix(unixTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style></style>
