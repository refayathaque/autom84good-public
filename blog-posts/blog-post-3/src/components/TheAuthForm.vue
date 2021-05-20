<template>
  <form id="root" class="border border-info mb-3 p-2">
    <p><i>TheAuthForm.vue</i></p>
    <label for="usernameInput" class="form-label">Username</label>
    <input
      type="text"
      class="form-control"
      id="usernameInput"
      placeholder="bobsmith"
      :value="username"
      @input="$emit('update:username', $event.target.value)"
    />
    <label for="passwordInput" class="form-label mt-3">Password</label>
    <input
      type="text"
      class="form-control"
      id="passwordInput"
      :value="password"
      @input="$emit('update:password', $event.target.value)"
    />
    <div
      v-if="signInProcess.error"
      class="alert alert-danger mt-4"
      role="alert"
    >
      {{ signInProcess.errorData.message }}
    </div>
    <div v-if="newPassword.required">
      <div class="alert alert-info mt-4" role="alert">
        Since you're signing for the first time, you must provide your own
        password
      </div>
      <div
        v-if="newPassword.error"
        class="alert alert-danger mt-4"
        role="alert"
      >
        {{ newPassword.errorData.message }}
      </div>
      <label for="newPasswordInput" class="form-label">New password</label>
      <input
        type="text"
        class="form-control mb-2"
        id="newPasswordInput"
        :value="newPassword"
        @input="$emit('update:newPassword', $event.target.value)"
      />
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "TheAuthForm",
  props: {
    signInProcess: { type: Object, required: true },
    newPassword: { type: Object, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    newPasswordInput: { type: String, required: true },
  },
  emits: ["update:username", "update:password", "update:newPassword"],
};
</script>

<style></style>
