<template>
  <div>
    <v-card variant="tonal" class="w-xs-100 w-75 mx-auto">
      <v-card-title class="text-center">Register</v-card-title>
      <v-card-text>
        <v-form v-model="form" @submit.prevent="handleSubmit">
          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Username"
            prependIcon="mdi-account"
            v-model="username"
          />

          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Email"
            prependIcon="mdi-email"
            v-model="email"
          />

          <v-select
            label="Are you..."
            :items="['Patient', 'Doctor']"
            v-model="role"
            prependIcon="mdi-account-question"
            variant="outlined"
            :rules="[required]"
            :readonly="loading"
          ></v-select>
          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            prependIcon="mdi-lock"
            v-model="password"
          />

          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Confirm Password"
            prependIcon="mdi-lock-open"
            v-model="comfirmPassword"
          />

          <v-btn
            variant="flat"
            color="primary"
            block
            type="submit"
            :disabled="!form"
            >Register</v-btn
          >
        </v-form>
      </v-card-text>
      <p class="text-center">
        <router-link :to="{ name: 'Login' }"
          >Already have an account?
          <span class="text-primary">Login</span></router-link
        >
      </p>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { supabase } from "../lib/supabaseClient";
import {
  VCard,
  VCardTitle,
  VCardText,
  VSelect,
  VForm,
  VTextField,
  VBtn,
} from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";

const username = ref("dulice");
const email = ref("duliceellen600@gmail.com");
const password = ref("123456");
const comfirmPassword = ref("123456");
const role = ref(null);
const form = ref(false);
const loading = ref(false);
const toast = useToast();
const router = useRouter();

const handleSubmit = async () => {
  try {
    loading.value = true;
    if (password.value !== comfirmPassword.value) {
      return toast.error("Password do not match", 2000);
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: data.user.email,
          username: username.value,
          role: role.value,
        },
        { returning: "minimal" }
      );
      if (profileError) throw profileError;
    }

    if (error) throw error;
    toast.success("Verify your email to login", 3000);
    router.push({ name: "Login" });
  } catch (error) {
    toast.error(error);
  } finally {
    loading.value = false;
  }
};

function required(v) {
  return !!v || "Field is required";
}
</script>

<style lang="scss" scoped></style>
