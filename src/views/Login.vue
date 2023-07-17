<template>
  <div class="my-16">
    <v-card variant="tonal" class="w-xs-100 w-75 mx-auto">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form v-model="form" @submit.prevent="handleSubmit">
          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Email"
            prependIcon="mdi-email"
            v-model="email"
          />

          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            prependIcon="mdi-lock"
            v-model="password"
          />

          <v-btn
            variant="flat"
            color="primary"
            block
            type="submit"
            :disabled="!form"
            :loading="loading"
            >Login</v-btn
          >
        </v-form>
        <p class="text-center my-5">OR</p>
        <v-btn
          variant="text"
          color="warning"
          prependIcon="mdi-google"
          block
          type="button"
          @click="googleSigin"
          >Signin with Google</v-btn
        >
      </v-card-text>
      <p class="text-center">
        <router-link :to="{ name: 'Register' }"
          >Do not have an account?
          <span class="text-primary">Register</span></router-link
        >
      </p>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import {
  VCard,
  VCardTitle,
  VCardText,
  VForm,
  VTextField,
  VBtn,
} from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "../store/users";

const email = ref("");
const password = ref("");
const form = ref(false);
const router = useRouter();
const toast = useToast();
const loading = ref(false);
const store = useUserStore();

const handleSubmit = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: data.user.email,
        },
        { returning: "minimal" }
      );
      if (profileError) throw profileError;
    }
    await store.getUser();

    if (error) throw error;
    router.push({ name: "Home" });
  } catch (error) {
    toast.error(error, 3000);
  } finally {
    loading.value = false;
  }
};

const googleSigin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};
function required(v) {
  return !!v || "Field is required";
}
</script>

<style lang="scss" scoped></style>
