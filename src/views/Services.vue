<template id="services">
  <div class="my-16">
    <v-row>
      <v-col cols="12" sm="4">
        <p class="big-head mb-3">Our Services</p>
        <p class="subtitle-2 mb-3 text-gray">
          We offer a wealth of resources whether you're seeking information
          about a specific medical condition, looking for tips on healthy
          living, or exploring the latest advancements in healthcare.
        </p>
        <v-btn color="primary">Our Service</v-btn>
      </v-col>
      <v-col cols="12" sm="8">
        <v-row>
          <v-col v-for="service in services" cols="4">
            <v-card variant="tonal">
              <v-card-item>
                <div class="d-flex justify-center">
                  <v-btn :icon="service.icon" color="red"></v-btn>
                </div>
                <p class="text-center text-subtitle-2 mt-4">
                  {{ service.name }}
                </p>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="mt-10">
      <p class="big-head">What Our Client Say</p>
      <v-row v-if="reviews">
        <v-col cols="12" sm="4" v-for="review in reviews" :key="review.id">
          <v-card class="h-100">
            <v-card-text>
              <div>
                <v-icon
                  icon="mdi-format-quote-open"
                  size="50"
                  color="primary"
                ></v-icon>
                <p class="comment">{{ review.comment }}</p>
                <v-rating
                  readonly
                  density="compact"
                  v-model="review.rating"
                  color="warning"
                  class="my-3"
                ></v-rating>
                <div>
                  <v-avatar class="d-flex ma-auto">
                    <v-img
                      :src="review.patients.profiles.avatar ?? img"
                      cover
                    />
                  </v-avatar>
                  <p class="text-center text-gray my-3">
                    {{ review.patients.profiles.username }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="value in 3" cols="12" sm="4">
          <v-skeleton-loader
            type="image, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import {
  VRow,
  VCol,
  VBtn,
  VCard,
  VCardText,
  VAvatar,
  VImg,
  VCardItem,
  VRating,
  VIcon,
} from "vuetify/lib/components/index.mjs";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import { watchEffect, ref } from "vue";
import img from "../assets/user.jpg";
import { services } from "../data/services";
import { supabase } from "../lib/supabaseClient";

const reviews = ref(null);

watchEffect(async () => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select(`id, comment, rating, patients(profiles(username, avatar))`)
      .order("inserted_at", { ascending: false })
      .limit(3);
    if (error) throw error;
    Promise.all(
      data.map(async (el) => {
        el.patients.profiles.avatar = await getAvatar(
          el.patients.profiles.avatar
        );
        return el;
      })
    ).then((res) => (reviews.value = res));
  } catch (error) {
    console.log(error);
  }
});

const getAvatar = async (file) => {
  if (file && !file.includes("https")) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(file);
    if (error) console.log(error);
    return URL.createObjectURL(data);
  }
};
</script>

<style scoped>
.comment {
  height: 6rem;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>