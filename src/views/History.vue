<template>
  <div>
    <v-table height="300px" class="mb-5" hover>
      <thead>
        <tr>
          <th>Doctor Name</th>
          <th>Treatement</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="patients && patients.length > 0">
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.doctor_name }}</td>
          <td>{{ patient.treatement }}</td>
          <td>{{ patient.name }}</td>
          <td>{{ patient.phone }}</td>
          <td class="text-warning bold">
            {{ moment(patient.date).format("HH:mm - DD MMM") }}
          </td>
          <td>
            <Modal :patient="patient"></Modal>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center text-error" colspan="5">
            <span>You don't have any booking </span>
            <router-link :to="{ name: 'Appointment' }">
              <v-btn color="primary" variant="text">Book Now</v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import moment from "moment";
import { supabase } from "../lib/supabaseClient";
import { VTable, VBtn } from "vuetify/lib/components/index.mjs";
import { ref, watchEffect } from "vue";
import { useUserStore } from "../store/users";
import { useToast } from "vue-toast-notification";
import Modal from "../components/Modal.vue";

const patients = ref(null);
const store = useUserStore();
const toast = useToast();

watchEffect(async () => {
  if (store.user) {
    const { data, error } = await supabase
      .from("patients")
      .select(
        `id, name, phone, gender, treatement, date, doctor_name, profiles(username)`
      )
      .eq("patient_id", store.user.id);
    if (error) toast.error(error);
    patients.value = data;
  }
});
</script>

<style lang="scss" scoped></style>
