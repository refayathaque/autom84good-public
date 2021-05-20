<template>
  <div id="root" class="border border-secondary m-3 p-2">
    <p><i>Auth.vue</i></p>
    <div class="container">
      <div class="row">
        <div class="col">
          <the-auth-info
            :auth="auth"
            :signInProcess="signInProcess"
            :signOutProcess="signOutProcess"
          ></the-auth-info>
        </div>
        <div class="col">
          <the-auth-form
            :signInProcess="signInProcess"
            :newPassword="newPassword"
            v-model:username.trim="username"
            v-model:password.trim="password"
            v-model:newPasswordInput.trim="newPasswordInput"
          ></the-auth-form>
          <button
            type="button"
            class="btn btn-primary"
            :class="{ disabled: auth.status === 'unauthenticated' }"
            @click="handleSignOut"
          >
            Sign out
          </button>
          <button
            type="button"
            class="btn btn-primary ms-2"
            :class="{ disabled: auth.status === 'authenticated' }"
            @click="handleSignIn"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- https://v3.vuejs.org/guide/component-custom-events.html#multiple-v-model-bindings -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheAuthForm from "../components/TheAuthForm.vue";
import TheAuthInfo from "../components/TheAuthInfo.vue";

export default {
  name: "TheAuth",
  components: { TheAuthForm, TheAuthInfo },
  data() {
    return {
      modal: false,
      username: "",
      password: "",
      newPasswordInput: "",
    };
  },
  computed: {
    ...mapGetters("authModule", [
      "signInProcess",
      "signOutProcess",
      "newPassword",
      "auth",
    ]),
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
    handleSignIn() {
      this.signIn({ username: this.username, password: this.password });
    },
    handleSignOut() {
      console.log("authenticated user being signed out");
      this.signOut();
    },
    handleCompleteNewPassword() {
      console.log(
        "authentication interrupted for new user to submit new password"
      );
      this.completeNewPassword({ newPassword: this.newPassword });
    },
    ...mapActions("authModule", ["signIn", "signOut", "completeNewPassword"]),
  },
};
</script>

<style></style>
