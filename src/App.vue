<template>
  <main id="main">
    <v-layout>
      <Header></Header>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </main>
  <Footer></Footer>
</template>

<script setup>
import { VContainer, VMain, VLayout } from "vuetify/lib/components/index.mjs";
import "vue-toast-notification/dist/theme-sugar.css";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<style lang="scss" scoped></style>
