<template>
  <div>
    <HeaderView />
    <div class="container">
      <h1>Add Contact Details</h1>
      <form action="" class="form-horizontal">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Name</label>
          <div class="col-sm-5">
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              v-model="form.name"
            />
          </div>
        </div>
        <div class="form-group left">
          <div class="col">
            <label for="" class="control-label col-sm-3">Email</label>
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control"
                name="email"
                id="email"
                v-model="form.email"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="addContact()"
          >
            Add Contact
          </button>
          <button type="button" class="btn btn-dark margen" v-on:click="exit()">
            Exit
          </button>
        </div>
      </form>
    </div>
    <FooterView />
  </div>
</template>
<script>
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import axios from "axios";
import Vue from "vue";
import VuejsDialog from "vuejs-dialog";

import "vuejs-dialog/dist/vuejs-dialog.min.css";
Vue.use(VuejsDialog);

export default {
  name: "AddContact",
  components: {
    HeaderView,
    FooterView,
  },
  data: function () {
    return {
      form: {
        email: "",
        id: 6,
        name: "",
      },
    };
  },
  methods: {
    addContact() {
      axios
        .post(
          "https://elite-dev-test-api.azurewebsites.net/api/Contact",
          this.form
        )
        .then(() => {
          Vue.dialog.alert({ title: "The contact has been created" });
          this.$router.push("/");
        });
    },
    exit() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.left {
  text-align: left;
}
.margen {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
