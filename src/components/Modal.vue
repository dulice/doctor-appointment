<template>
  <v-col cols="auto">
    <v-dialog transition="dialog-top-transition" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-pencil"
          v-bind="props"
          >Write Review</v-btn
        >
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="text-center" title="Write A Review"></v-toolbar>
          <v-card-text>
            <v-rating v-model="rating" color="primary"></v-rating>
            <v-textarea
              color="primary"
              variant="outlined"
              :readonly="loading"
              :rules="[required]"
              label="Write Comment"
              prepend-inner-icon="mdi-comment"
              v-model="comment"
              aria-multiline
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
            <v-btn
              color="primary"
              variant="flat"
              @click="handleReview((isActive.value = false))"
              :loading="loading"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script setup>
import {
  VRating,
  VBtn,
  VCol,
  VDialog,
  VCard,
  VCardActions,
  VCardText,
  VToolbar,
  VTextarea,
} from "vuetify/lib/components/index.mjs";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { supabase } from "../lib/supabaseClient";

const rating = ref(0);
const comment = ref(null);
const loading = ref(false);
const toast = useToast();
const props = defineProps(["patient"]);

const handleReview = async () => {
  if (rating.value > 0) {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from("reviews")
        .upsert({
          patient_id: props.patient.id,
          comment: comment.value,
          rating: rating.value,
        })
        .select();
      if (error) throw error;
      if (data) toast.success("Thanks for your review");
      loading.value = false;
    } catch (error) {
      toast.error(error);
      loading.value = false;
    }
  } else {
    toast.error("Rating Must be at least one.");
  }
};

const text = "Dr Alexander is a profession and patient doctor. My teeth was paining from past many days and not it's recovered and I can chew properly."

function required(v) {
  return !!v || "Field is required";
}
</script>

