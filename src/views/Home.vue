<template>
  <section>
    <Hero />
    <v-row>
      <v-col v-for="home in homeData" cols="12" sm="4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card v-bind="props" :class="{ 'on-hover': isHovering }">
              <v-card-text>
                <div class="d-flex justify-center">
                  <v-btn
                    :color="isHovering ? '' : 'warning'"
                    :icon="home.icon"
                    class="mb-3"
                  ></v-btn>
                </div>
                <p
                  :class="isHovering && 'text-white'"
                  class="text-center text-h6 mb-3 tr"
                >
                  {{ home.title }}
                </p>
                <p class="text-center text-gray mb-3">{{ home.description }}</p>
                <router-link :to="{ name: home.link }">
                  <v-btn block variant="tonal">{{ home.action }}</v-btn>
                </router-link>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </section>
  <About />
  <Doctors />
  <Services />
</template>

<script setup>
import {
  VRow,
  VCol,
  VImg,
  VBtn,
  VCard,
  VCardText,
  VHover,
} from "vuetify/lib/components/index.mjs";
import { homeData } from "../data/home";
import Services from "./Services.vue";
import About from "./About.vue";
import Doctors from "./Doctors.vue";
import Hero from "../components/Hero.vue";
</script>

<style scoped>
.on-hover {
  background-color: orange;
  transition: all 1s;
}
</style>
