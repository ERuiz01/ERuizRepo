<template>
  <div>
    <HeaderView />
    <div class="container">
      <h1>Contact Details</h1>
      <form action="" class="form-horizontal">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Id</label>
          <div class="col-sm-5">
            <input
              type="text"
              class="form-control"
              name="id"
              id="id"
              disabled
              v-model="form.id"
            />
          </div>
        </div>
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
                :rules="rules.email"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button type="button" class="btn btn-primary" v-on:click="edit()">
            Edit Contact
          </button>
          <button
            type="button"
            class="btn btn-danger margen"
            v-on:click="deletecontact()"
          >
            Delete Contact
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
  name: "EditContact",
  components: {
    HeaderView,
    FooterView,
  },
  data: function () {
    return {
      contactId: null,
      form: {
        email: "",
        id: null,
        name: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        email: [
          (recommendation) => !!recommendation || 'no hay email',
          (recommendation) =>
            (recommendation.length > 3 && recommendation.length < 100) ||
            'tiene que ser mayot',
        ],
      };
    },
  },
  methods: {
    edit() {
      axios
        .put(
          "https://elite-dev-test-api.azurewebsites.net/api/Contact/" +
            this.contactId,
          this.form
        )
        .then(() => {
          Vue.dialog.alert("The contact has been updated");
          this.$router.push("/");
        });
    },
    exit() {
      this.$router.push("/");
    },
    deletecontact() {
      axios
        .delete(
          "https://elite-dev-test-api.azurewebsites.net/api/Contact/" +
            this.contactId
        )
        .then(() => {
          Vue.dialog.alert("The contact has been deleted");
          this.$router.push("/");
        });
    },
  },
  mounted: function () {
    this.contactId = this.$route.params.id;
    axios
      .get(
        "https://elite-dev-test-api.azurewebsites.net/api/Contact/" +
          this.contactId
      )
      .then((user) => {
        this.form.email = user.data.email;
        this.form.id = user.data.id;
        this.form.name = user.data.name;
      });
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
