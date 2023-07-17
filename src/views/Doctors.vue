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

    <v-row v-if="doctors">
      <v-col
        v-for="doctor in doctors"
        cols="12"
        sm="6"
        md="3"
        class="justify-content-center"
      >
        <v-card>
          <v-card-text>
            <div class="d-flex flex-column justify-content-center align-center">
              <v-avatar size="130" variant="elevated">
                <v-img :src="doctor?.avatar ?? defaultUser" cover />
              </v-avatar>
              <p class="mt-2 text-h6">{{ doctor.username }}</p>
              <div>
                <v-chip color="primary">{{ doctor.profession }}</v-chip>
              </div>
              <div class="mt-2 d-flex align-items-center">
                <v-rating size="xs" v-model="rating" color="warning"></v-rating>
                <p class="ms-3">(3)</p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn variant="tonal" prepend-icon="mdi-calendar">Avaliable</v-btn>

            <v-btn @click="handleBook" variant="tonal" prepend-icon="mdi-phone"
              >Book</v-btn
            >
          </v-card-actions>
        </v-card>
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
  VAvatar,
  VImg,
  VRating,
  VChip,
  VCard,
  VCardText,
  VCardActions,
  VBtn,
} from "vuetify/lib/components/index.mjs";
import { ref, watchEffect } from "vue";
import defaultUser from "../assets/user.jpg";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/users";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

const rating = ref(4);
const route = useRoute();
const doctors = ref(null);
const store = useUserStore();
const router = useRouter();

watchEffect(async () => {
  if (!store.doctors) {
    await store.getDoctors();
  }
  doctors.value = store.doctors;
});

const handleBook = () => {
  router.push({ name: "Appointment" });
};
</script>

<style lang="scss" scoped></style>
