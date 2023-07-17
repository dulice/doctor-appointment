<template>
  <div>
    <v-table height="300px" class="mb-5" hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Treatement</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-if="patients && patients.length > 0">
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ patient.phone }}</td>
          <td>{{ patient.treatement }}</td>
          <td class="text-warning bold">
            {{ moment(patient.date).format("HH:mm - DD MMM") }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center text-error" colspan="5">
            You don't have any booking
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import moment from "moment";
import { supabase } from "../lib/supabaseClient";
import { VTable } from "vuetify/lib/components/index.mjs";
import { ref, watchEffect } from "vue";
import { useUserStore } from "../store/users";
import { useToast } from "vue-toast-notification";

const patients = ref(null);
const store = useUserStore();
const toast = useToast();

watchEffect(async () => {
  if (store.user) {
    const { data, error } = await supabase
      .from("patients")
      .select()
      .eq("email", store.user.email);
    if (error) toast.error(error);
    patients.value = data;
  }
});
</script>

<style lang="scss" scoped></style>
