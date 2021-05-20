<template>
  <div id="root" class="border border-secondary m-3 p-2">
    <p><i>DyDb.vue</i></p>
    <div class="container">
      <div class="row">
        <div class="col">
          <p><u>All items in the AWS DynamoDB table "students"</u></p>
          <p v-for="document in items" :key="document.lastName.S">
            {{ document.lastName.S }}
          </p>
        </div>
        <div class="col">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="firstName" class="form-label">First name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                aria-describedby="firstName"
                v-model.trim="firstName"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                aria-describedby="lastName"
                v-model.trim="lastName"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Add student to DynamoDB table "students"
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {
    ...mapGetters("dydbModule", ["items"]),
    ...mapGetters("authModule", ["auth"]),
  },
  mounted() {
    this.getItems()
  },
  methods: {
    onSubmit() {
      const payload = { firstName: this.firstName, lastName: this.lastName };
      this.addItem(payload);
    },
    ...mapActions("dydbModule", ["getItems", "addItem"]),
    ...mapActions("authModule", ["getAuth"]),
  },
};
</script>

<style></style>
