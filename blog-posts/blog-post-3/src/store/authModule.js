import { Auth } from "aws-amplify";

const authModule = {
  namespaced: true,
  state() {
    return {
      newPassword: { status: "idle", required: false, error: false },
      newUserSignIn: {},
      // ^ Cognito response object when a new user signs in for first time with provided temporary password
      // ^ not required by components, hence no structured object like other state properties here
      credentials: { status: "idle", error: false },
      auth: { status: "idle", error: false },
      signInProcess: { status: "idle", error: false },
      signOutProcess: { status: "idle", error: false },
    };
  },
  actions: {
    async signIn({ state, commit, dispatch }, payload) {
      // console.log("action | signIn | payload:", payload);
      commit("setSignInProcess", { ...state.signInProcess, status: "waiting" });
      commit("setSignOutProcess", { status: "idle", error: false }); // resetting state property 'signOutProcess' (in case user signs in right after signing out)
      try {
        const response = await Auth.signIn(payload.username, payload.password);
        if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
          commit("setNewPassword", { ...state.newPassword, required: true });
          commit("setNewUserSignIn", response);
          commit("setSignInProcess", {
            ...state.signInProcess,
            status: "aborted",
          });
          return;
        }
        // when it's NOT the user's first time signing in
        await dispatch("getAuth"); // currentAuthenticatedUser
        commit("setSignInProcess", {
          ...state.signInProcess,
          status: "success",
        });
        // console.log("action | signIn | response:", response);
      } catch (error) {
        commit("setSignInProcess", {
          status: "failure",
          error: true,
          errorData: error,
        });
        // console.log("action | signIn | error:", error);
      }
    },
    async completeNewPassword({ state, commit, dispatch }, payload) {
      // console.log("action | completeNewPassword | payload:", payload);
      commit("setNewPassword", {
        ...state.newPassword,
        status: "waiting",
        required: true,
      });
      try {
        const response = await Auth.completeNewPassword(
          state.newUserSignIn,
          payload.newPassword
        );
        commit("setNewPassword", {
          ...state.newPassword,
          status: "success",
          required: false,
        });
        await dispatch("getAuth"); // currentAuthenticatedUser
        console.log("action | completeNewPassword | response:", response);
      } catch (error) {
        commit("setNewPassword", {
          status: "failure",
          required: true,
          error: true,
          errorData: error,
        });
        // console.log("action | completeNewPassword | error:", error);
      }
    },
    async getAuth({ state, commit, dispatch }) {
      commit("setAuth", {
        ...state.auth,
        status: "waiting",
      });
      console.log(state.auth);
      try {
        const response = await Auth.currentAuthenticatedUser();
        // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-authenticated-user
        if (response === "The user is unauthenticated") {
          commit("setAuth", {
            ...state.auth,
            status: "aborted",
            response,
          });
          return;
        }
        commit("setAuth", { ...state.auth, status: "success", response });
        await dispatch("getCredentials"); // since auth successful, getting AWS access/secretAccess keys
        // console.log("action | getAuth | response:", response);
      } catch (error) {
        commit("setAuth", { status: "failure", error: true, errorData: error });
        // console.log("action | getAuth | error:", error);
      }
    },
    async getCredentials({ state, commit }) {
      commit("setCredentials", { ...state.auth, status: "waiting" });
      try {
        const response = await Auth.currentCredentials();
        if (
          response ===
          "NotAuthorizedException: Unauthenticated access is not supported for this identity pool."
        ) {
          // when user is not assigned to a Cognito user pool group, i.e., has no role assigned
          commit("setCredentials", {
            ...state.credentials,
            status: "aborted",
            response,
          });
          return;
        }
        commit("setCredentials", {
          ...state.auth,
          status: "success",
          response,
        });
        // console.log("action | getCredentials | response:", response);
      } catch (error) {
        commit("setCredentials", {
          status: "failure",
          error: true,
          errorData: error,
        });
        // console.log("action | getCredentials | error:", error);
      }
    },
    async signOut({ state, commit }) {
      commit("setSignOutProcess", {
        ...state.signOutProcess,
        status: "waiting",
      });
      try {
        const response = await Auth.signOut();
        commit("setSignOutProcess", {
          ...state.signOutProcess,
          status: "success",
        });
        commit("setAuth", { status: "idle", error: false }); // resetting state property 'auth'
        commit("setCredentials", { status: "idle", error: false }); // resetting state property 'credentials'
        commit("setSignInProcess", { status: "idle", error: false }); // resetting state property 'signInProcess'
        console.log("action | signOut | response:", response);
      } catch (error) {
        commit("setSignOutProcess", {
          status: "failure",
          error: true,
          errorData: error,
        });
        // console.log("action | signOut | error:", error);
      }
    },
  },
  mutations: {
    setSignInProcess(state, payload) {
      state.signInProcess = payload;
    },
    setNewUserSignIn(state, payload) {
      state.newUserSignIn = payload;
    },
    setAuth(state, payload) {
      state.auth = payload;
    },
    setNewPassword(state, payload) {
      state.newPassword = payload;
    },
    setCredentials(state, payload) {
      state.credentials = payload;
    },
    setSignOutProcess(state, payload) {
      state.signOutProcess = payload;
    },
  },
  getters: {
    signInProcess({ signInProcess }) {
      console.log(signInProcess);
      return signInProcess;
    },
    newPassword({ newPassword }) {
      return newPassword;
    },
    auth({ auth }) {
      return auth;
    },
    credentials({ credentials }) {
      console.log(credentials);
      return credentials;
    },
    signOutProcess({ signOutProcess }) {
      return signOutProcess;
    },
  },
};

export default authModule;
