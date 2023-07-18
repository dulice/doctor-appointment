<template>
  <div>
    <div class="d-flex justify-space-between">
      <p class="text-h5 font-weight-bold">Our Specialist Doctor</p>
      <router-link v-if="route.path !== '/doctors'" :to="{ name: 'Doctors' }">
        <v-btn color="primary" variant="tonal" append-icon="mdi-arrow-right">
          More
        </v-btn>
      </router-link>
    </div>

    <v-row v-if="doctors && route.path === '/doctors'">
      <v-col
        v-for="doctor in doctors"
        :key="doctor.id"
        cols="12"
        sm="6"
        md="3"
        class="justify-content-center"
      >
        <doctor-card :doctor="doctor"></doctor-card>
      </v-col>
    </v-row>
    <v-row v-else-if="doctors && route.path === '/'">
      <v-col
        v-for="doctor in doctors.slice(0,4)"
        :key="doctor.id"
        cols="12"
        sm="6"
        md="3"
        class="justify-content-center"
      >
        <doctor-card :doctor="doctor"></doctor-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="value in 4" cols="12" sm="6" md="3">
        <v-skeleton-loader
          type="image, list-item-three-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import {
  VRow,
  VCol,
  VBtn,
} from "vuetify/lib/components/index.mjs";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../store/users";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import DoctorCard from "../components/DoctorCard.vue";

const route = useRoute();
const doctors = ref(null);
const store = useUserStore();

watchEffect(async () => {
  if (!store.doctors) {
    await store.getDoctors();
  }
  doctors.value = store.doctors;
});
</script>

<style lang="scss" scoped></style>
