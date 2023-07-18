<template>
  <v-card>
    <v-card-text>
      <div class="d-flex flex-column justify-content-center align-center">
        <v-avatar size="130" variant="elevated">
          <v-img :src="doctor?.avatar ?? defaultUser" cover/>
        </v-avatar>
        <p class="mt-2 text-h6">{{ doctor.username }}</p>
        <div>
          <v-chip color="primary">{{ doctor.profession }}</v-chip>
        </div>
        <div class="mt-2 d-flex align-items-center">
          <v-rating readonly size="xs" v-model="rating" color="warning"></v-rating>
          <p class="ms-3">({{ reviewerCount }})</p>
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
</template>

<script setup>
import {
  VAvatar,
  VImg,
  VRating,
  VChip,
  VCard,
  VCardText,
  VCardActions,
  VBtn,
} from "vuetify/lib/components/index.mjs";
import defaultUser from "../assets/user.jpg";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";

const props = defineProps(["doctor"]);
const { doctor } = props;

const rating = ref(null);
const reviewerCount = ref(null);
const router = useRouter();
watchEffect(async() => {
  try {
    // rating calculation
    const { data, error } = await supabase.from('reviews').select(`id, rating, patients(doctor_email)`);
    if(error) throw error;
    const filterDr = data.filter(el => el.patients.doctor_email === doctor.email);
    const totalRating = filterDr.reduce((sum, value) => sum + Number(value.rating), 0);
    const avgRating = totalRating / filterDr.length;
    rating.value = avgRating;
    reviewerCount.value = filterDr.length;
  } catch (error) {
    console.log(error)
  }
})

const handleBook = () => {
  router.push({ name: "Appointment" });
};
</script>

<style lang="scss" scoped></style>
