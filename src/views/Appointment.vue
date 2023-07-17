<template>
  <div class="my-16">
    <v-card variant="tonal" class="w-xs-100 w-75 mx-auto">
      <v-card-title class="text-center">Make Appointment</v-card-title>
      <v-card-text>
        <v-form v-model="form" @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Your Name"
                prependInnerIcon="mdi-account"
                v-model="name"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Select Gender"
                prependInnerIcon="mdi-gender-male-female"
                v-model="gender"
                :items="['Male', 'Female']"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Phone"
                prependInnerIcon="mdi-phone"
                v-model="phone"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Choose Date"
                prependInnerIcon="mdi-calendar"
                v-model="date"
                type="datetime-local"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-if="doctors"
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Select Doctor"
                prependInnerIcon="mdi-doctor"
                v-model="doctorName"
                :items="doctors"
                item-title="username"
                item-value="id"
                return-object
              >
                <template v-slot:selection="{ item }">
                  <v-list>
                    <v-list-item
                      :title="item.title"
                      :prepend-avatar="item.value.avatar"
                    ></v-list-item>
                  </v-list>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                variant="outlined"
                :readonly="loading"
                :rules="[required]"
                label="Select Your Treatement"
                prependInnerIcon="mdi-needle"
                v-model="treatement"
                :items="[
                  'Neurology',
                  'Pregency',
                  'Cardiology',
                  'Dental',
                  'Dermatology',
                  'Urology',
                  'General',
                ]"
              />
            </v-col>
          </v-row>

          <v-btn
            variant="flat"
            color="primary"
            block
            type="submit"
            :disabled="!form"
            :loading="loading"
            >Book</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {
  VCard,
  VCardTitle,
  VCardText,
  VForm,
  VTextField,
  VBtn,
  VCol,
  VRow,
  VSelect,
  VList,
  VListItem,
} from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "../store/users";
import { ref, watchEffect } from "vue";
import { supabase } from "../lib/supabaseClient";

const doctors = ref(null);
const name = ref("");
const phone = ref("");
const gender = ref("");
const date = ref("");
const doctorName = ref("");
const treatement = ref("");
const form = ref(false);
const loading = ref(false);
const router = useRouter();
const toast = useToast();
const store = useUserStore();

function required(v) {
  return !!v || "Field is required";
}

watchEffect(async () => {
  await store.getDoctors();
  doctors.value = store.doctors;
});

const handleSubmit = async () => {
  try {
    if (doctorName.value.id) {
      loading.value = true;
      const { error } = await supabase.from("patients").insert({
        doctor_id: doctorName.value.id,
        name: name.value,
        email: store.user.email,
        phone: phone.value,
        gender: gender.value,
        date: date.value,
        treatement: treatement.value,
      });
      if (error) throw error;
      toast.success("Book Successfully", 3000);
      router.push({ name: "Home" });
    }
  } catch (error) {
    toast.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
