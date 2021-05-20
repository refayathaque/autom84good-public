<template>
  <div id="root" class="border border-warning m-3 p-2">
    <p><i>App.vue</i></p>
    <router-link class="btn btn-dark" to="/auth" tag="button"
      >Auth.vue</router-link
    >
    <router-link class="btn btn-dark ms-2" to="/dydb" tag="button"
      >DyDb.vue</router-link
    >
    <router-view> </router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
