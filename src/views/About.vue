<template>
  <div class="my-16">
    <v-row>
      <v-col cols="12" sm="5">
        <v-img :src="about" aspect-ratio="1/1" />
      </v-col>
      <v-col cols="0" sm="1"></v-col>
      <v-col cols="12" sm="6" class="align-self-center">
        <p class="big-head mb-4">About Us</p>
        <p class="mb-4 text-gray">
          Our team of medical professionals is dedicated to guiding you on your
          path to optimal health. We combine years of expertise with a
          compassionate approach to ensure that you receive the highest quality
          care. From preventive medicine to specialized treatments, we strive to
          deliver personalized solutions tailored to your unique circumstances.
        </p>
        <v-btn append-icon="mdi-arrow-right" color="primary">Learn More</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { VRow, VCol, VBtn, VImg } from "vuetify/lib/components/index.mjs";
import about from "../assets/about.png";
</script>

<style lang="scss" scoped></style>
