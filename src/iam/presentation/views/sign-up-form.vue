<script setup>

import useIamStore from "@/iam/application/iam.store.js";
import {useRouter} from "vue-router";
import {FloatLabel as PvFloatLabel} from "primevue";

const router = useRouter();
const store = useIamStore();
const {signUp} = store;
const form = reactive({
  username: "",
  password: "",
});

function performSignUp() {
  let signUpCommand = new SignUpCommand(form);
  console.log(signUpCommand);
  signUp(signUpCommand, router);
}

</script>

<template>
  <div>
    <h3>Sign Up</h3>
  </div>
  <p class="p-fluid mb-5">Please enter your details to create an account.</p>
  <div>
    <form @submit.prevent="performSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="username">Username</label>
            <pv-input-text id="username" v-model="form.username" :class="{'p-invalid': !form.username}" />
            <small v-if="!form.username" class="p-invalid">Username is required</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="password">Password</label>
            <pv-input-text id="password" v-model="form.password" :class="{'p-invalid': !form.password}" />
            <small v-if="!form.password" class="p-invalid">Password is required</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-button label="Sign Up" type="submit">Sign Up</pv-button>
        </div>
      </div>
    </form>
  </div>

</template>

<style scoped>

</style>