<template>
  <v-app-bar prominent>
    <v-toolbar-title>
      <router-link :to="{ name: 'Home' }">
        <v-img :src="logo" cover style="width: 70px" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <router-link v-for="route in routes" :to="{ name: route.name }">
      <v-btn :prepend-icon="route.icon"> {{ route.name }} </v-btn>
    </router-link>

    <v-menu v-if="user" :text="user.username">
      <template v-slot:activator="{ props }">
        <v-avatar
          class="mr-5"
          v-bind="props"
          :image="user?.avatar ? user.avatar : defaultUser"
        ></v-avatar>
      </template>
      <v-list>
        <v-list-item>
          <router-link :to="{ name: 'UpdateProfile' }">
            <v-btn prepend-icon="mdi-account-edit" variant="text"
              >Edit Profile</v-btn
            >
          </router-link>
        </v-list-item>

        <v-list-item v-if="user?.role === 'Doctor'">
          <router-link :to="{ name: 'Patients' }">
            <v-btn prepend-icon="mdi-pill-multiple" variant="text"
              >Patients</v-btn
            >
          </router-link>
        </v-list-item>

        <v-list-item v-else>
          <router-link :to="{ name: 'History' }">
            <v-btn prepend-icon="mdi-history" variant="text"
              >Appointment History</v-btn
            >
          </router-link>
        </v-list-item>

        <v-list-item>
          <v-btn @click="handleLogout" prepend-icon="mdi-logout" variant="text"
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <div v-else>
      <router-link :to="{ name: 'Login' }">
        <v-btn prepend-icon="mdi-login-variant"> Login </v-btn>
      </router-link>
      <router-link :to="{ name: 'Register' }">
        <v-btn prepend-icon="mdi-account-plus"> Register </v-btn>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup>
import {
  VAvatar,
  VImg,
  VAppBar,
  VToolbarTitle,
  VBtn,
  VSpacer,
  VMenu,
  VList,
  VListItem,
} from "vuetify/lib/components/index.mjs";
import logo from "../assets/logo.png";
import { routes } from "../routes";
import defaultUser from "../assets/user.jpg";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/users";
import { ref, watchEffect, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

const router = useRouter();
const user = ref(null);
const store = useUserStore();

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  if (data.user?.app_metadata.provider === "google") {
    await store.signInWithProvider(data);
  } else {
    await store.getUser();
  }
});

watchEffect(() => {
  user.value = store.user;
});

const handleLogout = async () => {
  await store.signOut();
  user.value = store.user;
  if (!store.user) {
    router.push({ name: "Login" });
  }
};
</script>

<style lang="scss" scoped></style>
